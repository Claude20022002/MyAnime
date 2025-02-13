import "./card.css";

export default function Card({
    anime,
    activeAnime,
    setActiveAnime,
    setBackground,
}) {
    const isActive = activeAnime === anime.mal_id;

    const handleCardClick = () => {
        if (isActive) {
            setActiveAnime(null);
            setBackground("/public/images/fotor-ai-20250213172456.jpg"); // Assurez-vous que l'image est bien dans `public`
        } else {
            setActiveAnime(anime.mal_id);
            setBackground(anime.images.jpg.large_image_url);
        }
    };

    return (
        <div
            className={`anime-card ${isActive ? "active" : ""}`}
            style={{
                backgroundImage: `url(${anime.images.jpg.large_image_url})`,
            }}
            onClick={handleCardClick}
        >
            <div className="card-title">{anime.title}</div>
        </div>
    );
}
