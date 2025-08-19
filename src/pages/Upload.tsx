import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { subjects } from "@/data/seedData";
import { Upload as UploadIcon, X, Plus, FileText, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadFormData {
  title: string;
  subject: string;
  type: string;
  unit: string;
  tags: string[];
  author: string;
  description: string;
  url: string;
  isLink: boolean;
}

const Upload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<UploadFormData>({
    title: "",
    subject: "",
    type: "",
    unit: "",
    tags: [],
    author: "",
    description: "",
    url: "",
    isLink: false
  });
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resourceTypes = ["Notes", "Slides", "Assignment", "Syllabus", "Links", "Videos"];
  const units = Array.from({ length: 12 }, (_, i) => `Unit ${i + 1}`);
  units.unshift("All", "General");

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.unit) newErrors.unit = "Unit is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (formData.isLink && !formData.url.trim()) newErrors.url = "URL is required for links";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store in localStorage (MVP implementation)
      const existingUploads = JSON.parse(localStorage.getItem("userUploads") || "[]");
      const newResource = {
        id: `r${Date.now()}`,
        title: formData.title,
        subjectCode: formData.subject,
        subject: subjects.find(s => s.code === formData.subject)?.name || "",
        type: formData.type,
        unit: formData.unit,
        tags: formData.tags,
        author: formData.author,
        url: formData.url || "#",
        description: formData.description,
        uploadedAt: new Date().toISOString().split('T')[0],
        views: 0,
        featured: false
      };

      existingUploads.push(newResource);
      localStorage.setItem("userUploads", JSON.stringify(existingUploads));

      toast({
        title: "Upload Successful!",
        description: `${formData.title} has been uploaded successfully.`,
      });

      // Reset form
      setFormData({
        title: "",
        subject: "",
        type: "",
        unit: "",
        tags: [],
        author: "",
        description: "",
        url: "",
        isLink: false
      });

      // Navigate to subject page if selected
      if (formData.subject) {
        navigate(`/subjects/${formData.subject}`);
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass text-sm font-medium mb-6">
            <UploadIcon className="w-4 h-4 mr-2 text-primary" />
            Share Knowledge
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Upload Resource
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your study materials with fellow students. Help build our collaborative learning community.
          </p>
        </div>

        {/* Upload Form */}
        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-base font-medium">
                Resource Title *
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g., Design Patterns Complete Notes"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className={`mt-2 ${errors.title ? "border-destructive" : ""}`}
              />
              {errors.title && <p className="text-destructive text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Subject and Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="subject" className="text-base font-medium">
                  Subject *
                </Label>
                <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                  <SelectTrigger className={`mt-2 ${errors.subject ? "border-destructive" : ""}`}>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject.code} value={subject.code}>
                        {subject.code} - {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subject && <p className="text-destructive text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <Label htmlFor="type" className="text-base font-medium">
                  Resource Type *
                </Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger className={`mt-2 ${errors.type ? "border-destructive" : ""}`}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {resourceTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-destructive text-sm mt-1">{errors.type}</p>}
              </div>
            </div>

            {/* Unit and Author */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="unit" className="text-base font-medium">
                  Unit/Week *
                </Label>
                <Select value={formData.unit} onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}>
                  <SelectTrigger className={`mt-2 ${errors.unit ? "border-destructive" : ""}`}>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map(unit => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.unit && <p className="text-destructive text-sm mt-1">{errors.unit}</p>}
              </div>

              <div>
                <Label htmlFor="author" className="text-base font-medium">
                  Author Name *
                </Label>
                <Input
                  id="author"
                  type="text"
                  placeholder="Your name or group name"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  className={`mt-2 ${errors.author ? "border-destructive" : ""}`}
                />
                {errors.author && <p className="text-destructive text-sm mt-1">{errors.author}</p>}
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label className="text-base font-medium">
                Tags
              </Label>
              <div className="mt-2 space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Add tags (e.g., algorithms, sorting)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button type="button" variant="outline" onClick={handleAddTag}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-base font-medium">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Brief description of the resource content..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="mt-2"
                rows={3}
              />
            </div>

            {/* File/Link Toggle */}
            <div>
              <Label className="text-base font-medium">
                Resource Type
              </Label>
              <div className="mt-2 flex gap-4">
                <Button
                  type="button"
                  variant={!formData.isLink ? "default" : "outline"}
                  onClick={() => setFormData(prev => ({ ...prev, isLink: false }))}
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  File Upload
                </Button>
                <Button
                  type="button"
                  variant={formData.isLink ? "default" : "outline"}
                  onClick={() => setFormData(prev => ({ ...prev, isLink: true }))}
                  className="flex items-center gap-2"
                >
                  <LinkIcon className="w-4 h-4" />
                  External Link
                </Button>
              </div>
            </div>

            {/* File Upload or URL */}
            {formData.isLink ? (
              <div>
                <Label htmlFor="url" className="text-base font-medium">
                  Resource URL *
                </Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://..."
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  className={`mt-2 ${errors.url ? "border-destructive" : ""}`}
                />
                {errors.url && <p className="text-destructive text-sm mt-1">{errors.url}</p>}
              </div>
            ) : (
              <div>
                <Label className="text-base font-medium">
                  Upload File
                </Label>
                <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <UploadIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-2">Drag and drop your file here, or click to browse</p>
                  <p className="text-sm text-muted-foreground">Supports PDF, DOC, PPT, images, and more</p>
                  <Button type="button" variant="outline" className="mt-4">
                    Choose File
                  </Button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Uploading..." : "Upload Resource"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;