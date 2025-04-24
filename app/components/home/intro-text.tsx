interface IntroTextProps {
  title: string;
  description: string;
}

export const IntroText = ({ title, description }: IntroTextProps) => {
  return (
    <div className="my-6">
      <h3 className="font-medium uppercase text-2xl tracking-tight">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};
