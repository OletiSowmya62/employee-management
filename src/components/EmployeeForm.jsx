function EmployeeForm({
  employee,
  errors,
  handleChange,
  handleSubmit,
  buttonText,
  buttonClass = "btn btn-success",
  disabled = false,
  onCancel,
  cancelButtonText = "Cancel",
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        {/* Name */}
        <div className="col-12 col-md-6 mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Enter name"
            value={employee.name}
            onChange={handleChange}
          />
          {errors?.name && (
            <small className="text-danger">{errors.name}</small>
          )}
        </div>
        {/* Email */}
        <div className="col-12 col-md-6 mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Enter email"
            value={employee.email}
            onChange={handleChange}
          />
          {errors?.email && (
            <small className="text-danger">{errors.email}</small>
          )}
        </div>
        {/* Phone */}
        <div className="col-12 col-md-6 mb-3">
          <label className="form-label">Phone</label>
          <input
            className="form-control"
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={employee.phone}
            onChange={handleChange}
          />
          {errors?.phone && (
            <small className="text-danger">{errors.phone}</small>
          )}
        </div>
        {/* Department */}
        <div className="col-12 col-md-6 mb-3">
          <label className="form-label">Department</label>
          <input
            className="form-control"
            type="text"
            name="department"
            placeholder="Enter department"
            value={employee.department}
            onChange={handleChange}
          />
          {errors?.department && (
            <small className="text-danger">{errors.department}</small>
          )}
        </div>
        {/* Designation */}
        <div className="col-12 col-md-6 mb-3">
          <label className="form-label">Designation</label>
          <input
            className="form-control"
            type="text"
            name="designation"
            placeholder="Enter designation"
            value={employee.designation}
            onChange={handleChange}
          />
          {errors?.designation && (
            <small className="text-danger">{errors.designation}</small>
          )}
        </div>
        {/* Salary */}
        <div className="col-12 col-md-6 mb-3">
          <label className="form-label">Salary</label>
          <input
            className="form-control"
            type="number"
            name="salary"
            placeholder="Enter salary"
            value={employee.salary}
            onChange={handleChange}
          />
          {errors?.salary && (
            <small className="text-danger">{errors.salary}</small>
          )}
        </div>
      </div>
      <div className="d-flex gap-2">
        <button
          type="submit"
          className={buttonClass}
          disabled={disabled}
        >
          {buttonText}
        </button>
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            {cancelButtonText}
          </button>
        )}
      </div>
    </form>
  );
}

export default EmployeeForm;