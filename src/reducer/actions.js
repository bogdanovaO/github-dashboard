import axios from 'axios';

const countRepos = count => ({
  type: 'COUNT_REPOS',
  payload: count
})
const getRepos = repos => ({
  type: 'GET_REPOS',
  payload: repos
})


export const getPopularRepositories = () =>  dispatch => {
  axios
    .get(
      `https://ghapi.huchen.dev/repositories`,
      {
        headers: {
          'Accept': 'application/vnd.github.cloak-preview'
        }
      })
    .then(res => {
      const data = res.data.slice(0, 10) 
      dispatch(countRepos(0))
      dispatch(getRepos(data))
      localStorage.setItem('allRepositories', JSON.stringify(data))
      if (res.data.result) {
      } else {
        console.error(res.data.error);
      }
    })
}

export const searching = (text, page) => dispatch => {
  const searchText = text
  const currentPage = page
  if (searchText != null ) {
    axios
    .get(
      `https://api.github.com/search/repositories?q=${searchText}+&sort=stars&order=desc&page=${currentPage}&per_page=10`,
      {
        headers: {
          'Content-Type': 'application/vnd.github.mercy-preview+json'
        }
      })
    .then(res => {
      dispatch(countRepos(res.data.total_count / 10))
      dispatch(getRepos(res.data.items))
      localStorage.setItem('allRepositories', JSON.stringify(res.data.items))
      if (res.data.result) {
      } else {
        console.error(res.data.error);
      }
})
  }
}
