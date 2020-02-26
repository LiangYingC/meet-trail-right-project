import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { DB } from '../../../lib';

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInputValue: '',
            searchList: []
        }
    }

    componentDidMount() {
        const { history } = this.props
        if (history) {
            if (history.location.search || history.location.pathname === '/trails') {
                const equalPosition = history.location.search.indexOf('=')
                const searchValue = decodeURI(history.location.search.slice(equalPosition + 1))
                this.setState(preState => ({
                    ...preState,
                    searchInputValue: searchValue,
                }))
            }
        }
    }

    changeSearchInputValue = (e) => {
        e.persist()
        this.setState((preState) => ({
            ...preState,
            searchInputValue: e.target.value,
            searchList: []
        }), this.handleSearchDropDown)
    }

    handleSearchDropDown = () => {
        const { searchInputValue } = this.state
        if (searchInputValue) {
            DB.ref('trails')
                .get()
                .then(querySnapshot => {
                    let searchList = []
                    querySnapshot.forEach(doc => {
                        if (doc.data().title.indexOf(`${searchInputValue}`) >= 0) {
                            let searchItem = {
                                id: doc.id,
                                title: doc.data().title,
                                city: doc.data().location.city
                            }
                            searchList.push(searchItem)
                            this.setState(preState => {
                                if (preState.searchInputValue) {
                                    return ({
                                        ...preState,
                                        searchList: searchList
                                    })
                                } else {
                                    return ({
                                        ...preState,
                                        searchList: []
                                    })
                                }

                            })
                        }
                    })
                })
        }
    }

    closeSearchDropDown = () => {
        this.setState(preState => ({
            ...preState,
            searchList: []
        }))
    }


    render() {
        const { searchInputValue, searchList } = this.state
        return (
            <div className="flex search-bar">
                <input
                    type="text"
                    id="search-input"
                    placeholder="輸入步道名稱"
                    value={searchInputValue}
                    onChange={this.changeSearchInputValue}
                />

                {
                    searchInputValue ?
                        <Link to={`/trails?search=${searchInputValue}`}>
                            <div className="search-icon" onClick={this.closeSearchDropDown}>
                                <i className="fas fa-search"></i>
                            </div>
                        </Link>
                        :
                        <div className="search-icon">
                            <i className="fas fa-search"></i>
                        </div>

                }

                <div className="search-dropdown-box">
                    <div className="search-list">
                        {
                            searchList.map(searchItem => {
                                return (
                                    <Link to={`/trails/detail/${searchItem.id}`}>
                                        <div className={`flex search-item`} key={searchItem.id}>
                                            <div className="flex trail-title">
                                                <i className="fas fa-mountain"></i>
                                                <p>{searchItem.title}</p>
                                            </div>
                                            <div className="flex trail-location">
                                                <i className="fas fa-map-marker-alt"></i>
                                                <p>{searchItem.city}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar;