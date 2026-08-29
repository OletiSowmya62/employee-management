function DeleteConfirmModal({
  employee,
  onConfirm,
  onCancel,
  deleting = false,
}) {
  if (!employee) {
    return null;
  }

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onCancel}
                disabled={deleting}
              ></button>
            </div>
            <div className="modal-body">
              <p className="mb-2">Are you sure you want to delete this employee?</p>
              <strong>{employee.name}</strong>
              <p className="text-secondary mb-0">{employee.email}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default DeleteConfirmModal;