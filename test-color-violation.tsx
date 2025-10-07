// Temporary test file to verify pre-commit hook
export default function TestComponent() {
  return (
    <div className="text-red-500 bg-blue-400">
      This should trigger a color violation
    </div>
  );
}
