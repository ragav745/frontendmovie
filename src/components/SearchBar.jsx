// Simple search field component used on movie listing pages.
function SearchBar({ value, onChange, placeholder = 'Search movie...' }) {
  return (
    <div className="input-group search-bar">
      <span className="input-group-text bg-white border-end-0">🔎</span>
      <input
        type="text"
        className="form-control border-start-0"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-label="Search movies"
      />
    </div>
  );
}

export default SearchBar;
