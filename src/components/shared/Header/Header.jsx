import { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import headerLogoImg from '../../../assets/logo/logo260x70-deep .png';
import headerLogoSmallImg from '../../../assets/logo/logo270x270-deep .png';
import userImg from '../../../assets/img/user.png';
import AuthUserContext from '../../../contexts/AuthUserContext';
import SearchBar from '../SearchBar';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionY: window.pageYOffset,
      movedY: 0,
      isHideHeader: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const lastPositonY = this.state.positionY;
    this.setState(
      {
        positionY: window.pageYOffset,
      },
      () => this.calculateScrollHeight(lastPositonY)
    );
  };

  calculateScrollHeight = lastPositonY => {
    const scrollHeight = window.pageYOffset - lastPositonY;
    this.setState(
      preState => ({
        movedY: preState.movedY + scrollHeight,
      }),
      this.handleHeaderHide
    );
  };

  handleHeaderHide = () => {
    const { movedY, positionY } = this.state;
    if (movedY > 30) {
      this.setState({
        movedY: 0,
        isHideHeader: true,
      });
    } else if (movedY <= -120 || positionY <= 30) {
      this.setState({
        movedY: 0,
        isHideHeader: false,
      });
    }
  };

  render() {
    const { history } = this.props;
    const { isHideHeader } = this.state;
    const { isLogin, userData } = this.context;
    return (
      <>
        <header id="header" className={`${isHideHeader ? 'hide' : ''}`}>
          <div className="flex wrap">
            <Link to="/">
              <div className="header-logo web">
                <img src={headerLogoImg} alt="選山步道 logo" />
              </div>
            </Link>
            <Link to="/">
              {history ? (
                history.location.pathname === '/' ? (
                  <div
                    className="header-logo mobile"
                    style={{
                      width: '200px',
                    }}
                  >
                    <img src={headerLogoImg} alt="選山步道 logo" />
                  </div>
                ) : (
                  <div className="header-logo mobile">
                    <img src={headerLogoSmallImg} alt="選山步道 logo" />
                  </div>
                )
              ) : (
                <div className="header-logo mobile">
                  <img src={headerLogoSmallImg} alt="選山步道 logo" />
                </div>
              )}
            </Link>
            {history ? (
              history.location.pathname === '/' ? (
                ''
              ) : (
                <div className="header-search-bar">
                  <SearchBar history={history} />
                </div>
              )
            ) : (
              <div className="header-search-bar">
                <SearchBar history={history} />
              </div>
            )}
            <div className="header-nav">
              <ul>
                <NavLink exact to="/trails" activeClassName="selected">
                  <li>全部步道</li>
                </NavLink>
                <NavLink
                  to={`${isLogin ? '/trailCreate' : '/login'}`}
                  activeClassName={`${isLogin ? 'selected' : ''}`}
                >
                  <li>提供步道</li>
                </NavLink>
                <Link to={`${isLogin ? '/profile' : '/login'}`}>
                  <div id="header-user-btn">
                    {isLogin ? (
                      <img src={userData.picture} alt={`${userData.name}的照片`} />
                    ) : (
                      <img src={userImg} alt="user logo" />
                    )}
                  </div>
                </Link>
              </ul>
            </div>
          </div>
        </header>
        <div className={`header-mobile-nav ${isHideHeader ? 'hide' : ''}`}>
          <ul>
            <NavLink exact to="/trails" activeClassName="selected">
              <li>
                <i className="fas fa-mountain"></i>
                <p>全部步道</p>
              </li>
            </NavLink>
            <NavLink
              to={`${isLogin ? '/trailCreate' : '/login'}`}
              activeClassName={`${isLogin ? 'selected' : ''}`}
            >
              <li>
                <i className="fas fa-pen-square"></i>
                <p>提供步道</p>
              </li>
            </NavLink>
            <NavLink to={`${isLogin ? '/profile' : '/login'}`} activeClassName="selected">
              <div id="header-user-btn">
                {isLogin ? (
                  <img src={userData.picture} alt={`${userData.name}的照片`} />
                ) : (
                  <img src={userImg} alt="user logo" />
                )}
                <p>個人資料</p>
              </div>
            </NavLink>
          </ul>
        </div>
      </>
    );
  }
}

Header.contextType = AuthUserContext;
export default Header;
