interface DeleteModalProps {
  project: {
    title: string;
  };
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({
  project,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] p-6 rounded-xl border-2 border-[#B8860B] shadow-2xl max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete &quot;{project.title}&quot;? This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border-2 border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B]/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
