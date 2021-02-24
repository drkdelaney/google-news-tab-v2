import classnames from 'classnames';
import './styles.css';

interface NewsStoryProps {
    content: string;
    enclosure: {
        link: string;
    };
    link: string;
    title: string;
}

export function NewsStory(props: NewsStoryProps) {
    const { content, enclosure, link, title } = props;
    const newStoryClasses = classnames({
        newsStoryContainer: true,
        noImage: !enclosure?.link,
    });
    if (!content.startsWith('<ol>') && !content.endsWith('</ol>')) {
        const [titleText, subtitle] = title.split(' - ');
        return (
            <div className={newStoryClasses}>
                <ol>
                    <li>
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {titleText}
                        </a>
                        &nbsp;&nbsp;{subtitle}
                    </li>
                </ol>
            </div>
        );
    }
    return (
        <div className={newStoryClasses}>
            {enclosure.link && <img src={enclosure.link} alt="news" />}
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}
