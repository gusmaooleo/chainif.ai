import { Textarea } from "@/components/ui/textarea";

const ContentTextarea = ({ 
  value, 
  onChange 
}: { 
  value: string; 
  onChange: (value: string) => void 
}) => (
  <Textarea
    defaultValue={value}
    placeholder="Registered content"
    className="text-sm max-w-[462px] text-gray-600 placeholder:text-gray-300 min-h-[200px] max-h-[500px]"
    onChange={(e) => onChange(e.target.value)}
    maxLength={3000}
    required
  />
);

export default ContentTextarea;