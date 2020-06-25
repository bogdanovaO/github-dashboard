import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Repositories.sass';
import { ReactComponent as Star } from '../svg/starIcon.svg';

class RepoDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentRepository: []
    }
  }

  componentDidMount() {
    const currentId = this.props.match.params.id
    const data = JSON.parse(localStorage.getItem('allRepositories'))
    const findingData = data.find(item => {
      return item.name === currentId
    })
    this.setState({ currentRepository: findingData })
  }

  render() {
    const { currentRepository } = this.state

    const owner = currentRepository.owner ? currentRepository.owner : null

    const ico = owner ? owner.avatar_url : currentRepository.avatar
    const url = owner ? owner.html_url : currentRepository.url
    const author = owner ? owner.login : currentRepository.author
    const name = currentRepository.name
    const stars = currentRepository.stars ? currentRepository.stars : currentRepository.stargazers_count
    const day = currentRepository.updated_at ? currentRepository.updated_at.substr(8, 2) : null
    const month = currentRepository.updated_at ? currentRepository.updated_at.substr(5, 2) : null
    const year = currentRepository.updated_at ? currentRepository.updated_at.substr(0, 4) : null

    return (
      <div className='repositoryCard'>

        <div className='cardHeader'>
          <div className='cardHeader__name'> <a href={url} className='repositoryCard__owner'>{author}</a>/{name}</div>
          <div className='cardHeader__update textLight'>{day} {month} {year}</div>
        </div>

        <div className='cardBody'>
          <div className='cardBody__ico'> <img className='cardBody__ico' src={ico} alt='userIco'/></div>
          <div className='cardBody__text'>
            <div className='cardBody__star'><Star/><div>{stars}</div></div>
            <div className='cardBody__desk'><div className='cardBody__title'>Основной язык:</div><div>{currentRepository.language}</div></div>
            <div className='cardBody__desk'><div className='cardBody__title'>Описание:</div><div>{currentRepository.description}</div></div>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentRepository: state.repositoriesReducer.repos
  };
};

export default connect(mapStateToProps)(RepoDetails)