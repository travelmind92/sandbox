import React from "react";

type Props = {
  title: string;
  subtitle: string;
  loadError: string | null;
  submitError: string | null;
  submitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  children: React.ReactNode;
};

/**
 * Shared layout for create/edit forms: card shell, header, optional load banner,
 * form body, submit error, Save/Cancel.
 */
function ResourceFormShell({
  title,
  subtitle,
  loadError,
  submitError,
  submitting,
  onSubmit,
  onCancel,
  children,
}: Props) {
  return (
    <section className="resource-form">
      <div className="resource-list-header">
        <div className="resource-list-header-row">
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
        </div>
      </div>

      {loadError && <p className="resource-list-message resource-list-error">{loadError}</p>}

      <form className="resource-form-body" onSubmit={onSubmit}>
        {children}

        {submitError && (
          <p className="resource-list-message resource-list-error">{submitError}</p>
        )}

        <div className="resource-form-actions">
          <button className="resource-form-primary-button" type="submit" disabled={submitting}>
            {submitting ? "Saving…" : "Save"}
          </button>
          <button
            className="resource-form-secondary-button"
            type="button"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default ResourceFormShell;
