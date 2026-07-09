function SectionCard({ icon: Icon, title, action, children, className = "" }) {
  return (
    <section className={`card-lift bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-[var(--shadow-card)] p-6 lg:p-7 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-50)] flex items-center justify-center">
              <Icon size={17} className="text-[var(--color-primary)]" strokeWidth={2} />
            </div>
          )}
          <h2 className="text-[17px] font-semibold text-[var(--color-ink)] tracking-tight">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export default SectionCard;
