import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, onConfirm, title, message }) {
  const dialogRef = useRef(null);
  const confirmButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      confirmButtonRef.current?.focus();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-30 z-40"
        onClick={onClose}
      />
      <dialog
        ref={dialogRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-xl bg-white p-6 max-w-md w-full z-50"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div>
          <h2 id="modal-title" className="text-lg font-medium text-gray-900">
            {title}
          </h2>
          <p id="modal-description" className="mt-2 text-sm text-gray-600">
            {message}
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Move Without Clearing
            </button>
            <button
              ref={confirmButtonRef}
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
            >
              Move and Clear
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}