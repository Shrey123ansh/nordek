function GradientComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[#553B8B] rounded-2xl blur"></div>
      {children}
    </div>
  );
}

export default GradientComponent;
