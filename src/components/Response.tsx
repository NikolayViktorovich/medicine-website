import { useState, useEffect } from 'react';
import './Response.css';

const RESPONSE_CONTENT = {
    heading: "Отзывы пациентов",
};

const responseData = [
    {
        stars: '★★★★★',
        description: 'Невероятно внимательный к деталям и знающий свое дело профессионал! Очень доступно объясняет, отвечает на все вопросы. Никакого дискомфорта',
        name: 'Аноним',
        nameRole: 'Пациент',
    },
    {
        stars: '★★★★★',
        description: 'Настенька, привет! Прости что поздно! Настя, ты меня спасла!!! Я теперь дышу!!! Спасибо тебе огромной мой сладкий доктор!!!!',
        name: 'Аноним',
        nameRole: 'Пациент',
    },
    {
        stars: '★★★★★',
        description: 'Анастасия, добрый день! Я наконец-то задышала полной грудью впервые за два месяца. Это такой кайф, вы бы знали 😂 Спасибо большое!',
        name: 'Аноним',
        nameRole: 'Пациент',
    },
    {
        stars: '★★★★★',
        description: 'От всей души благодарю грамотного и внимательного доктора Камынину Анастасию Викторовну. Попала к врачу с острой болью, после тщательного осмотра установлен правильный диагноз, начато лечение, которое мне помогло. До этого была на приеме в другой клинике, но доктор там абсолютно не вызвал доверия, не слушал и не вникал в проблему В вашей же клинике сразу попала в заботливые руки Анастасии Викторовны. Буду выполнять все назначения и поправляться. От всей души ещё раз спасибо!',
        name: 'Аноним',
        nameRole: 'Пациент',
    },
    {
        stars: '★★★★★',
        description: 'Несмотря на то, что врач - молодая девушка, но гораздо более квалифицирована, чем её более взрослые коллеги. Внимательна, вежлива и вдумчива.',
        name: 'А. Хацкевич',
        nameRole: 'Пациент',
    },
    {
        stars: '★★★★★',
        description: 'Сегодня была на приеме у врача-оториноларинголога Камыниной А.В. Быстро разобралась с моей проблемой, промыла миндалины. Ранее в другой клинике опыт промывания миндалин был негативный. Золотые руки, спасибо, док!',
        name: 'Елизавета Е.',
        nameRole: 'Пациент',
    }
];

const MAX_LENGTH = 200;

export default function Response() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const currentReview = responseData[currentIndex];
    const isLongText = currentReview.description.length > MAX_LENGTH;

    useEffect(() => {
        setIsExpanded(false);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % responseData.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + responseData.length) % responseData.length);
    };

    const getDisplayText = () => {
        if (!isMobile || !isLongText || isExpanded) {
            return currentReview.description;
        }
        return currentReview.description.slice(0, MAX_LENGTH) + '...';
    };

    return (
        <section className="response-section" id="response">
            <div className="container">
                <div className="response-content">
                    <h2 className="response-header">{RESPONSE_CONTENT.heading}</h2>
                </div>

                <div className="carousel-container">
                    <button className="carousel-btn prev" onClick={prevSlide} aria-label="Предыдущий отзыв">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    <div className="carousel-wrapper">
                        <div className="response-card">
                            <div className="quote-icon">"</div>
                            <div className="card-content">
                                <div className="stars">{currentReview.stars}</div>
                                <p className="description">
                                    {getDisplayText()}
                                </p>
                                {isMobile && isLongText && (
                                    <button 
                                        className="expand-btn"
                                        onClick={() => setIsExpanded(!isExpanded)}
                                    >
                                        {isExpanded ? 'Свернуть' : 'Раскрыть'}
                                    </button>
                                )}
                                <div className="name">{currentReview.name}</div>
                                <div className="nameRole">{currentReview.nameRole}</div>
                            </div>
                        </div>
                    </div>

                    <button className="carousel-btn next" onClick={nextSlide} aria-label="Следующий отзыв">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div className="carousel-dots">
                    {responseData.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Перейти к отзыву ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}