type TypographyProps = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';
  children: React.ReactNode;
  className?: string;
};

export const Typography = ({ variant = 'body', children, className = '' }: TypographyProps) => {
  const baseStyles = 'text-gray-800 dark:text-gray-200';
  
  const styles = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-semibold',
    h3: 'text-2xl font-medium',
    h4: 'text-xl font-medium',
    body: 'text-base',
    caption: 'text-sm text-gray-600'
  };

  return (
    <div className={`${baseStyles} ${styles[variant]} ${className}`}>
      {children}
    </div>
  );
}; 