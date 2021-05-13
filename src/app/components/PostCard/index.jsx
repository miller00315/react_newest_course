import './styles.css';

export const PostCard = ({post}) => {

    const {cover, title, body} = post;
    
    return (
        <div className="post">
            <img src={cover} alt={title} />
            <div className="post-content">
                <h2>{title}</h2>
                <p>{body}</p>
            </div>
        </div>
    );
}