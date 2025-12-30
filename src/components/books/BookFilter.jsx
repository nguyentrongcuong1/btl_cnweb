const BookFilter = ({ categories, onCategoryChange, onSearchChange }) => {
  return (
    <div className="filter-container p-3 border rounded shadow-sm bg-light">
      <h5>🔍 Tìm kiếm</h5>
      <input 
        type="text" 
        className="form-control mb-3" 
        placeholder="Nhập tên sách..." 
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <h5>📚 Thể loại</h5>
      <select 
        className="form-select" 
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="All">Tất cả thể loại</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};
export default BookFilter;