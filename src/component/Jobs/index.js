import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Profile from '../Profile'
import Header from '../Header'
import IndividualCompany from '../IndividualCompany'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    productData: [],
    similarProductsData: [],
    apiStatus: 'INITIAL',
    activeemploymenttype: [],
    activesalary: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getcompanyData()
  }

  handleChange = e => {
    const {activeemploymenttype} = this.state
    console.log(activeemploymenttype)
    const newelement = e.target.value
    const newarray = []
    if (activeemploymenttype.includes(newelement)) {
      for (let i = 0; i < activeemploymenttype.length; i = i + 1) {
        if (newelement !== activeemploymenttype[i]) {
          newarray.push(activeemploymenttype[i])
        }
      }
      this.setState(
        {
          activeemploymenttype: newarray,
        },
        () => {
          this.getcompanyData()
        },
      )
    } else {
      this.setState(
        {
          activeemploymenttype: [...activeemploymenttype, newelement],
        },
        () => {
          this.getcompanyData()
        },
      )
    }
  }

  handleChange1 = e => {
    const {activesalary} = this.state
    console.log(activesalary)
    const newelement = e.target.value
    this.setState(
      {
        activesalary: newelement,
      },
      () => {
        this.getcompanyData()
      },
    )
  }

  getcompanyData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeemploymenttype, activesalary, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeemploymenttype}&minimum_package=${activesalary}&search=${searchInput}`
    console.log(apiUrl)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.jobs.map(product => ({
        companylogourl: product.company_logo_url,
        employmenttype: product.employment_type,
        id: product.id,
        jobdescription: product.job_description,
        location: product.location,
        packageperannum: product.package_per_annum,
        rating: product.rating,
        title: product.title,
      }))
      console.log(updatedData)
      this.setState({
        productData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <button type="button" className="button">
        Continue Shopping
      </button>
    </div>
  )

  searching = event => {
    this.setState(
      {
        activesearch: event.target.value,
      },
      () => {
        this.getcompanyData()
      },
    )
  }

  changeRating = activeemploymenttype => {
    this.setState({activeemploymenttype}, this.getProducts)
  }

  changeCategory = activesalary => {
    this.setState({activesalary}, this.getProducts)
  }

  enterSearchInput = () => {
    this.getProducts()
  }

  changeSearchInput = event => {
    console.log(event.target.value)
    this.setState({searchInput: event.target.value})
    this.getcompanyData()
  }

  render() {
    const {productData} = this.state
    const shouldShowProductsList = productData.length > 0

    return shouldShowProductsList ? (
      <div className="jobscontainer1">
        <Header />
        <input type="search" className="sear" />
        <div className="jobscontainer">
          <div className="leftside">
            <div className="Profile">
              <Profile />
            </div>

            <hr
              style={{
                background: '#b6c5ff',
                color: '#b6c5ff',
                borderColor: '#b6c5ff',
                height: '2px',
                width: '100%',
              }}
              className="line"
            />

            <div className="TypeofEmployment1">
              <h3 className="white">Type of Employment</h3>
              <div>
                <input
                  value={employmentTypesList[0].employmentTypeId}
                  type="checkbox"
                  onChange={this.handleChange}
                />
                <span className="white">{employmentTypesList[0].label} </span>
              </div>

              <div>
                <input
                  value={employmentTypesList[1].employmentTypeId}
                  type="checkbox"
                  onChange={this.handleChange}
                />
                <span className="white">{employmentTypesList[1].label}</span>
              </div>

              <div>
                <input
                  value={employmentTypesList[2].employmentTypeId}
                  type="checkbox"
                  onChange={this.handleChange}
                />
                <span className="white">{employmentTypesList[2].label}</span>
              </div>

              <div>
                <input
                  value={employmentTypesList[3].employmentTypeId}
                  type="checkbox"
                  onChange={this.handleChange}
                />
                <span className="white"> {employmentTypesList[3].label} </span>
              </div>
            </div>

            <hr
              style={{
                background: '#b6c5ff',
                color: '#b6c5ff',
                borderColor: '#b6c5ff',
                height: '2px',
                width: '100%',
              }}
              className="line"
            />

            <div className="TypeofEmployment">
              <h3 className="white">Salary Range</h3>
              <div>
                <input
                  value={salaryRangesList[0].salaryRangeId}
                  type="checkbox"
                  onChange={this.handleChange1}
                />
                <span className="white"> {salaryRangesList[0].label}</span>
              </div>

              <div>
                <input
                  value={salaryRangesList[1].salaryRangeId}
                  type="checkbox"
                  onChange={this.handleChange1}
                />
                <span className="white">{salaryRangesList[1].label}</span>
              </div>

              <div>
                <input
                  value={salaryRangesList[2].salaryRangeId}
                  type="checkbox"
                  onChange={this.handleChange1}
                />
                <span className="white">{salaryRangesList[2].label}</span>
              </div>

              <div>
                <input
                  value={salaryRangesList[3].salaryRangeId}
                  type="checkbox"
                  onChange={this.handleChange1}
                />
                {console.log(salaryRangesList[3].salaryRangeId)}
                <span className="white"> {salaryRangesList[3].label}</span>
              </div>
            </div>
          </div>

          <div className="Rightside">
            <input
              type="search"
              className="searching"
              placeholder="Search"
              onChange={this.changeSearchInput}
            />

            <ul>
              {productData.map(eachContact => (
                <IndividualCompany
                  key={eachContact.id}
                  eachdetail={eachContact}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    ) : (
      <div className="jobscontainer1">
        <Header />
        <input type="search" className="sear" />
        <div className="jobscontainer">
          <div className="leftside">
            <div className="Profile">
              <Profile />
            </div>

            <hr
              style={{
                background: '#b6c5ff',
                color: '#b6c5ff',
                borderColor: '#b6c5ff',
                height: '2px',
                width: '100%',
              }}
              className="line"
            />

            <div className="TypeofEmployment1">
              <h3 className="white">Type of Employment</h3>
              <div>
                <input
                  value={employmentTypesList[0].employmentTypeId}
                  type="checkbox"
                  onChange={this.handleChange}
                />
                <span className="white">{employmentTypesList[0].label} </span>
              </div>

              <div>
                <input
                  value={employmentTypesList[1].employmentTypeId}
                  type="checkbox"
                  onChange={this.handleChange}
                />
                <span className="white">{employmentTypesList[1].label}</span>
              </div>

              <div>
                <input
                  value={employmentTypesList[2].employmentTypeId}
                  type="checkbox"
                  onChange={this.handleChange}
                />
                <span className="white">{employmentTypesList[2].label}</span>
              </div>

              <div>
                <input
                  value={employmentTypesList[3].employmentTypeId}
                  type="checkbox"
                  onChange={this.handleChange}
                />
                <span className="white"> {employmentTypesList[3].label} </span>
              </div>
            </div>

            <hr
              style={{
                background: '#b6c5ff',
                color: '#b6c5ff',
                borderColor: '#b6c5ff',
                height: '2px',
                width: '100%',
              }}
              className="line"
            />

            <div className="TypeofEmployment">
              <h3 className="white">Salary Range</h3>
              <div>
                <input
                  value={salaryRangesList[0].salaryRangeId}
                  type="checkbox"
                  onChange={this.handleChange1}
                />
                <span className="white"> {salaryRangesList[0].label}</span>
              </div>

              <div>
                <input
                  value={salaryRangesList[1].salaryRangeId}
                  type="checkbox"
                  onChange={this.handleChange1}
                />
                <span className="white">{salaryRangesList[1].label}</span>
              </div>

              <div>
                <input
                  value={salaryRangesList[2].salaryRangeId}
                  type="checkbox"
                  onChange={this.handleChange1}
                />
                <span className="white">{salaryRangesList[2].label}</span>
              </div>

              <div>
                <input
                  value={salaryRangesList[3].salaryRangeId}
                  type="checkbox"
                  onChange={this.handleChange1}
                />
                {console.log(salaryRangesList[3].salaryRangeId)}
                <span className="white"> {salaryRangesList[3].label}</span>
              </div>
            </div>
          </div>

          <div className="Rightside">
            <input
              type="search"
              className="searching"
              placeholder="Search"
              onChange={this.changeSearchInput}
            />

            <div className="no-products-view">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                className="no-products-img"
                alt="no jobs"
              />
              <h1 className="no-products-heading">No Products Found</h1>
              <p className="no-products-description">
                We could not find any products. Try other filters.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
