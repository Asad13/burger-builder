import { NavLink, Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import './Header.css';
import { logout } from '../../redux/authActionCreators';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.authState.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    }
}

const Header = props => {
    let links = null;
    if (props.token !== null) {
        links = (
            <ul className='nav-menu'>
                <li>
                    <NavLink to="/" style={(isActive) => ({
                        color: isActive ? "#fc035e" : "#fcfc03",
                        margin: '0 1rem',
                    })}>Build Burger</NavLink>
                </li>
                <li>
                    <NavLink to="/order" style={(isActive) => ({
                        color: isActive ? "#fc035e" : "#fcfc03",
                        margin: '0 1rem',
                    })}>Order</NavLink>
                </li>
                <li>
                    <button style={
                        {
                            background: 'none',
                            border: 'none',
                            outline: 'none',
                            margin: '3.5vh 1rem',
                            display: 'inline-block',
                            cursor: 'pointer',
                        }
                    }
                        onClick={
                            () => {
                                props.logout();
                            }
                        }>
                        Logout
                    </button>
                </li>
            </ul>
        );
    }
    return (
        <header className='header'>
            <div>
                <Link to="/" className='navbar-brand'><img src={Logo} alt="Logo" /></Link>
            </div>
            <nav className='navbar'>
                {links}
            </nav>
        </header>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);