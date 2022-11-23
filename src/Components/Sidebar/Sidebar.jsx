import React, { useEffect, useState } from 'react';
import { SiGooglescholar, SiCoursera } from 'react-icons/si';
import { AiFillCaretDown } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogout, MdEventNote, MdOutlinePersonAddAlt } from 'react-icons/md';
import { RiHome3Line, RiQuestionnaireLine }  from 'react-icons/ri';
import { FaSms } from 'react-icons/fa';
import { BsPersonLinesFill } from 'react-icons/bs';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import './style.css';
import { Link, NavLink } from 'react-router-dom';
import useAuthStore from '../../Store/globalStates';



const Sidebar = (props) => {
	const { userAuth } = useAuthStore();
	const [showUserDetail, setShowUserDetail] = useState(false);
	const sidebarClassList = document.getElementById('sidebar-menu')?.classList;

	const handleUserDropDown = () => {
		setShowUserDetail(current => !current);
	};

	const handleUserDropDownHover = () => {
		if(props.isMini){
			setShowUserDetail(!props.isMini)
		}
		props.handleHoverMenuToggle();
	};
	
	useEffect(() => {
		sidebarClassList?.toggle('mini-navbar');
	},[sidebarClassList])
  return (
    <nav id='sidebar-menu' className={`pcoded-navbar menu-light border-top border-end ${props.miniNavbar}`} onMouseEnter={(e) => {  handleUserDropDownHover() }}  onMouseLeave={() => { handleUserDropDownHover() }}>
		<div className="navbar-wrapper  ">
			<div className="navbar-content scroll-div " >
				
				<div className="account-detail-container">
					<div className="main-menu-header">
						<img className="avatar" src="https://cdn-icons-png.flaticon.com/512/3048/3048127.png" alt="User-Profile-Image" />
						<div className="user-details" onClick={handleUserDropDown}>
							<div id="more-details">{`${userAuth.first_name} ${userAuth.last_name}`} <AiFillCaretDown /></div>
						</div>
					</div>
					<div className={`nav-user-collapse-link  d-sm-none d-md-block ${showUserDetail ? 'show-user-link' : ''}`}>
						<ul className='user-collapse-link d-flex flex-column gap-3 py-3'>
							<li className="list-group-item">
								{userAuth.account_type === 1 ? 
								(
									<Link to="/admin/profiles">
										<CgProfile />
										View Profile
									</Link>
								)
								:
								(
									<Link to="/scholar/profiles">
										<CgProfile />
										View Profile
									</Link>
								) 
								}
								
							</li>
							<li className="list-group-item">
								<p onClick={props.handleLogout} className='cursor-pointer'>
									<MdOutlineLogout className='nav-icon' />
									Logout
								</p>
							</li>
						</ul>
					</div>
				</div>
				
				{userAuth.account_type === 1 ? 
				(
				<ul className="nav pcoded-inner-navbar ">
					<li className="nav-item pcoded-menu-caption">
						<label>Navigation</label>
						<hr className='hr-hidden' />
					</li>
					<li className="nav-item">
						<NavLink to="/admin/dashboard/" className="nav-link mx-3 my-2 d-flex rounded gap-3 align-items-center px-2 nav-active">
							<RiHome3Line /> 
							<span>
								Dashboard
							</span>
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/admin/event" className="nav-link  mx-3 my-2 d-flex rounded gap-3 align-items-center px-2">
							<MdEventNote /> 
							<span>
								Events
							</span>
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/admin/smsblast" className="nav-link  mx-3 my-2 d-flex rounded gap-3 align-items-center px-2">
							<FaSms /> 
							<span>
								SMS Blast
							</span>
						</NavLink>
					</li>
					

					<li className="nav-item pcoded-menu-caption">
						<label>Scholar</label>
						<hr className='hr-hidden' />
					</li>
					<li className="nav-item">
						<NavLink to="/admin/register" className="nav-link mx-3 my-2 d-flex rounded gap-3 align-items-center px-2">
							<MdOutlinePersonAddAlt /> 
							<span>
								Add Scholar
							</span>
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/admin/list" className="nav-link mx-3 my-2 d-flex rounded gap-3 align-items-center px-2">
							<BsPersonLinesFill /> 
							<span>
								List
							</span>
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/admin/scholardocument" className="nav-link mx-3 my-2 d-flex rounded gap-3 align-items-center px-2">
							<IoDocumentAttachOutline /> 
							<span>
								Documents
							</span>
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/admin/query" className="nav-link mx-3 my-2 d-flex rounded gap-3 align-items-center px-2">
							<RiQuestionnaireLine /> 
							<span>
								Query/Concern
							</span>
						</NavLink>
					</li>

					<li className="nav-item pcoded-menu-caption">
						<label>Master List</label>
						<hr className='hr-hidden' />
					</li>

					<li className="nav-item">
						<NavLink to="/admin/scholarship" className="nav-link mx-3 my-2 d-flex rounded gap-3 align-items-center px-2">
							<SiGooglescholar /> 
							<span>
								Scholarship
							</span>
						</NavLink>
					</li>
					{/* <li className="nav-item">
						<NavLink to="/admin/courses" className="nav-link mx-3 my-2 d-flex rounded gap-3 align-items-center px-2">
							<SiCoursera /> 
							<span>
								Courses
							</span>
						</NavLink>
					</li> */}
				</ul>
				)

				:
				(
				<ul className="nav pcoded-inner-navbar ">
					<li className="nav-item pcoded-menu-caption">
						<label>Navigation</label>
						<hr className='hr-hidden' />
					</li>
					<li className="nav-item">
						<NavLink to="/scholar/dashboard/" className="nav-link mx-3 my-2 d-flex rounded gap-3 align-items-center px-2 nav-active">
							<RiHome3Line /> 
							<span>
								Dashboard
							</span>
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/scholar/event" className="nav-link  mx-3 my-2 d-flex rounded gap-3 align-items-center px-2">
							<MdEventNote /> 
							<span>
								Events
							</span>
						</NavLink>
					</li>					

					<li className="nav-item pcoded-menu-caption">
						<label>Scholar</label>
						<hr className='hr-hidden' />
					</li>
					<li className="nav-item">
						<NavLink to="/scholar/scholardocument" className="nav-link mx-3 my-2 d-flex rounded gap-3 align-items-center px-2">
							<IoDocumentAttachOutline /> 
							<span>
								Documents
							</span>
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/scholar/query" className="nav-link mx-3 my-2 d-flex rounded gap-3 align-items-center px-2">
							<RiQuestionnaireLine /> 
							<span>
								Query/Concern
							</span>
						</NavLink>
					</li>
				</ul>
				)
				}			
			</div>
		</div>
	</nav>
  )
}

export default Sidebar;