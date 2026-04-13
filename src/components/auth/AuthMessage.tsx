type AuthMessageProps = {
  error?: string;
  message?: string;
};

export function AuthMessage({ error, message }: AuthMessageProps) {
  if (!error && !message) {
    return null;
  }

  return (
    <div
      className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
        error
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-navy-100 bg-navy-50 text-navy-800"
      }`}
    >
      {error ?? message}
    </div>
  );
}
