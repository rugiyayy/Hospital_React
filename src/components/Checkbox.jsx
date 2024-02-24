const Checkbox = ({ label, checked, onChange }) => (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
  
  <Checkbox
    label="Neurology"
    checked={selectedDepartments.includes(88)}
    onChange={() => handleDepartmentChange(88)}
  />
  

  