// import React, { useState, useEffect } from 'react';
// import classnames from 'classnames';
// // import { InView } from 'react-intersection-observer';
// // import { withStyles } from '@material-ui/core/styles';
// // import Tabs from '@material-ui/core/Tabs';
// // import Tab from '@material-ui/core/Tab';
// import './index.css';
// import { NewsStory } from '.';
// // import { Loading } from '../Loading';

// const newsTopics = [
//     'TOP_NEWS',
//     'NATION',
//     'WORLD',
//     'LOCAL',
//     'BUSINESS',
//     'TECHNOLOGY',
//     'ENTERTAINMENT',
//     'SPORTS',
//     'SCIENCE',
//     'HEALTH',
// ];

// const StyledTabs = withStyles({
//     root: {
//         borderBottom: '1px solid #e8e8e8',
//         zIndex: 2,
//         backgroundColor: '#fff',
//         margin: 12,
//     },
//     indicator: {
//         backgroundColor: '#1890ff',
//     },
// })(Tabs);

// const StyledTab = withStyles((theme) => ({
//     root: {
//         textTransform: 'none',
//         minWidth: 72,
//         fontWeight: theme.typography.fontWeightRegular,
//         '&:hover': {
//             color: '#40a9ff',
//             opacity: 1,
//         },
//         '&:selected': {
//             color: '#1890ff',
//             fontWeight: theme.typography.fontWeightMedium,
//         },
//         '&:focus': {
//             color: '#40a9ff',
//             backgroundColor: 'transparent',
//         },
//     },
// }))((props) => <Tab disableRipple {...props} />);

// function GoogleNews(props) {
//     const {
//         googleNews: { items = [] },
//         onNewsChange,
//         newsLoading,
//     } = props;
//     const [isInView, setIsInView] = useState(true);
//     function handleChange(inView) {
//         setIsInView(inView);
//     }

//     useEffect(() => {
//         const element = document.querySelector('.weather');
//         if (element) {
//             element.className = isInView ? 'weather' : 'weather offset';
//         }
//     }, [isInView]);

//     return (
//         <div className="googleNewsContainer">
//             <InView onChange={handleChange} threshold={1}>
//                 <NewsTabs isInView={isInView} onTabChange={onNewsChange} />
//             </InView>
//             {newsLoading ? (
//                 <Loading />
//             ) : (
//                 !isInView && <div style={{ height: 48 }} />
//             )}{' '}
//             {/* A place holder when the tabs are fixed to the top */}
//             {items.map((item) => (
//                 <NewsStory key={item.guid} {...item} />
//             ))}
//         </div>
//     );
// }

// export default GoogleNews;

export function GoogleNews() {}
