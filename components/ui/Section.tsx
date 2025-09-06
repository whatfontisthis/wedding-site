type SectionProps = {
  title: string;
  children: React.ReactNode;
  id?: string;
  currentLanguage?: 'ko' | 'en';
};

export default function Section({ title, children, id, currentLanguage }: SectionProps) {
  return (
    <div id={id} className="space-y-3 text-center">
      <h2 className={`text-2xl ${
        currentLanguage === 'en' ? 'font-pinyon font-bold' : 'font-semibold'
      }`} style={currentLanguage === 'ko' ? {fontFamily: '210 Yeonaesidae, sans-serif'} : {}}>{title}</h2>
      {children}
    </div>
  );
}


