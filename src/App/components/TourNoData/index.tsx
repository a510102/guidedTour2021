import noDataIcon from '../../../images/noData/no-data.png';

export function TourNoData() {
  return (
    <div className="no-data">
      <div className="no-data-content">
        <img src={noDataIcon} alt="no-data icon" />
        <p>
          <span className="error-title">Oops !</span>
          <span className="error-message">很抱歉，找不到符合此搜尋相關的內容。</span>
        </p>
      </div>
    </div>
  );
};
