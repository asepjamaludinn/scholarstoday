import Heading from "../../../components/ui/Heading";
import Text from "../../../components/ui/Text";

interface TermsSectionItemProps {
  title: string;
  content: string[];
  listItems?: string[];
}

export default function TermsSectionItem({
  title,
  content,
  listItems,
}: TermsSectionItemProps) {
  return (
    <div className="space-y-3">
      <Heading
        level="h2"
        className="text-xl font-bold tracking-tight text-slate-900"
      >
        {title}
      </Heading>

      {content.map((paragraph, index) => (
        <Text
          key={index}
          className={`leading-relaxed text-slate-600 ${index === 0 && listItems ? "font-medium" : ""}`}
        >
          {paragraph}
        </Text>
      ))}

      {listItems && listItems.length > 0 && (
        <ul className="list-disc pl-5 space-y-2 text-slate-600">
          {listItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
