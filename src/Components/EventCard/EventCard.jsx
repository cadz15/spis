import React from 'react';
import { RiCalendarEventLine } from 'react-icons/ri';
import './EventCard.css';

const EventCard = () => {
  return (
        <div className="card latest-update-card p-0">
            <div className="card-header p-3">
                <h6>Upcoming Events</h6>
                <div className="card-header-right">
                </div>
            </div>
            <div className="card-body p-0 ">
                <div className="latest-update-box px-5 ">
                    <div className="row event-date-container border-bottom ">
                        <div className="col-auto text-right  ">
                            <div className='d-flex align-items-center gap-3 pt-3'>
                                <span className="text-muted d-sm-none d-md-block">2 hrs ago</span>
                                <div className='event-icon bg-danger'>
                                    <RiCalendarEventLine  />
                                </div>
                            </div>
                        </div>
                        <div className="col pt-4">
                            <a href="#!">
                                <h6 className=''>+ 1652 Followers</h6>
                                <h5>+ 1652 Followers</h5>
                            </a>
                            <p className="text-muted m-b-0">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat fugiat consectetur similique assumenda suscipit iste consequuntur eveniet praesentium quas repellendus, non sequi inventore ex asperiores veniam ipsa voluptate. Similique, laboriosam!
                            Excepturi iusto dolore animi ipsam exercitationem ex doloribus sunt neque atque corrupti similique vel reiciendis provident eligendi quidem nemo, beatae, praesentium sint deserunt hic. Vel animi harum rem assumenda illo!
                            Voluptate ad ipsa quas deserunt nobis earum quae repudiandae recusandae, a nisi quis provident nam velit porro laboriosam facilis placeat distinctio obcaecati rerum minus maxime. Cum nobis molestias distinctio. Veritatis!
                            Ex facere deleniti a sapiente quidem cumque, similique quos asperiores corrupti aut omnis in voluptas iusto delectus quisquam molestiae vitae, tempore iure laudantium maiores! Architecto laborum voluptatum quisquam reprehenderit ea?
                            Excepturi amet fugiat labore odit molestias illo? Repellendus aperiam necessitatibus nobis? Dolorem cum blanditiis ex odio veniam sit quidem. Asperiores sint dolorem eaque, explicabo ad expedita dolores dolorum perspiciatis itaque!</p>
                        </div>
                    </div>
                    <div className="row event-date-container border-bottom ">
                        <div className="col-auto text-right  ">
                            <div className='d-flex align-items-center gap-3 pt-3'>
                                <span className="text-muted d-sm-none d-md-block">2 hrs ago</span>
                                <div className='event-icon bg-warning'>
                                    <RiCalendarEventLine  />
                                </div>
                            </div>
                        </div>
                        <div className="col pt-4">
                            <a href="#!">
                                <h6>+ 1652 Followers</h6>
                            </a>
                            <p className="text-muted m-b-0">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas maxime omnis id. Illum aspernatur facere ipsam quos necessitatibus repudiandae ducimus culpa velit voluptas sit, non quod iure accusamus. Libero, aut!
                                Saepe nisi unde, omnis assumenda similique id architecto voluptatum dolore iusto quasi eum atque veritatis placeat, ut in a perferendis, nobis temporibus! Doloribus delectus, harum recusandae dignissimos obcaecati eius adipisci.
                            </p>
                        </div>
                    </div>
                    
                </div>
                <div className="text-center">
                    <a href="#!" className="b-b-primary text-primary">View all Events</a>
                </div>
            </div>
        </div>
  )
}

export default EventCard;