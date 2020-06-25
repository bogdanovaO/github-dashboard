import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPopularRepositories, searching } from '../reducer/actions'
import ReactPaginate from 'react-paginate';
import './Repositories.sass';
import { ReactComponent as Star } from '../svg/starIcon.svg'
import { ReactComponent as Git } from '../svg/gitIcon.svg'

class Repositories extends Component {
  constructor(props) {
    super(props)
    this.handlePageClick = this.handlePageClick.bind(this);

    this.state = {
      searchText: '',
      currentPage: 1
    }
  }

  componentDidMount() {
    const page = localStorage.getItem('page')
    const text = localStorage.getItem('searchText')
    this.setState({
      searchText: text,
      currentPage: page
    }, () => {
      if (this.state.searchText.length > 0 && this.state.searchText.length !== '') {
        this.props.search(this.state.searchText, this.state.currentPage)
      } else {
        this.props.getPopularRepositories()
      }
    });
  }

  setSearchText = (e) => {
    const text = this.state.searchText;
    const page = this.state.currentPage
    const { value } = e.target;
    this.setState({ searchText: value })
    if (e.key === 'Enter' && text !== '') {
      this.props.search(text, page);
    } else {
      this.props.getPopularRepositories()
    }
  }

  handlePageClick = (e) => {
    const selectedPage = (e.selected + 1);
    localStorage.setItem('page', selectedPage);
    this.setState({
      currentPage: selectedPage,
    }, () => {
      if (this.state.searchText.length > 0 && this.state.searchText.length !== '') {
        this.props.search(this.state.searchText, this.state.currentPage)
      } else {
        this.props.getPopularRepositories()
      }
    });
  };

  handleInputSearch = e => {
    const { value } = e.target;
    this.setState({ searchText: value });
    localStorage.setItem('searchText', value);
  }

  render() {
    const { repos } = this.props
    const { searchText } = this.state

    return (
      <div className='repositories'>
        <input
          className='input'
          type="text"
          data-marker="search/input"
          placeholder='поиск по репозиториям'
          value={searchText}
          onKeyUp={event => this.setSearchText(event)}
          onChange={this.handleInputSearch}/>

        {
          (repos.length === 0 || undefined) ?
            <div>
              loading
            </div>
            :
            repos.map(item => (
              <div className='repository' key={item.name} >
                <a  href={item.url} className='repository__link'><Git/></a>
                <Link className='repository__name' to={`/detail/${item.name}`}>{item.name}</Link>
                <div className='repository__stars'><Star /><div>{item.stargazers_count ? item.stargazers_count : item.stars}</div></div>
              </div>))
        }

        <ReactPaginate
          tabindex="1"
          pageCount={this.props.count}
          pageRangeDisplayed={9}
          marginPagesDisplayed={0}
          nextLabel='>'
          breakLabel=' ... '
          previousLabel='<'
          onPageChange={this.handlePageClick}
          containerClassName='pagination'
          pageClassName='pagination__page'
          previousClassName={this.props.count > 0 ? 'pagination__page' : 'pagination__page_none'}
          nextClassName={this.props.count > 0 ? 'pagination__page' : 'pagination__page_none'}
          breakClassName='pagination__page'
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    repos: state.repositoriesReducer.repos,
    count: state.repositoriesReducer.count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPopularRepositories: () => {
      dispatch(getPopularRepositories());
    },
    search: (text, page) => {
      dispatch(searching(text, page))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);



