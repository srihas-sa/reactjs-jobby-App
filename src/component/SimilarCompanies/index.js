import './index.css'

const SimilarCompanies = props => {
  const {eachdetail} = props
  const {
    companylogourl,
    employmenttype,
    id,
    jobdescription,
    location,
    packageperannum,
    rating,
    title,
  } = eachdetail

  return (
    <li className="individualcompanycard321">
      <div className="indi">
        <img
          src={companylogourl}
          alt="similar job company logo"
          className="CompanyName"
        />
        <div className="indi1">
          <h1 className="title">{title}</h1>
          <p className="rating">{rating}</p>
        </div>
      </div>

      <div>
        <h1 className="Description">Description</h1>
        <p>{jobdescription}</p>
      </div>
      <div className="india">
        <p className="location">{location}</p>
        <p>{employmenttype}</p>
      </div>
    </li>
  )
}

export default SimilarCompanies
