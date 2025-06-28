const BouncingBall = () => {
    return (
        <div className="w-full h-full relative">
            <div className="bouncing-ball absolute right-0 bottom-0">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle
                        cx="30"
                        cy="30"
                        r="28"
                        fill="#FBBF24"
                        stroke="#fff"
                        strokeWidth="4"
                    />
                    <path
                        d="M30 10 Q40 30 30 50"
                        stroke="#2563eb"
                        strokeWidth="4"
                        fill="none"
                    />
                </svg>
            </div>
            <style jsx>{`
                .bouncing-ball {
                    animation: bounce-move 2.5s
                        cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
                }
                @keyframes bounce-move {
                    0% {
                        right: 0;
                        bottom: 0;
                        transform: scaleX(1) scaleY(1);
                    }
                    10% {
                        bottom: 60%;
                        transform: scaleX(1.1) scaleY(0.9);
                    }
                    20% {
                        bottom: 0;
                        transform: scaleX(0.95) scaleY(1.05);
                    }
                    30% {
                        bottom: 40%;
                        transform: scaleX(1.08) scaleY(0.92);
                    }
                    40% {
                        bottom: 0;
                        transform: scaleX(0.97) scaleY(1.03);
                    }
                    50% {
                        bottom: 25%;
                        transform: scaleX(1.04) scaleY(0.96);
                    }
                    60% {
                        bottom: 0;
                        transform: scaleX(1) scaleY(1);
                    }
                    100% {
                        right: 100%;
                        bottom: 0;
                        transform: scaleX(1) scaleY(1);
                    }
                }
            `}</style>
        </div>
    )
}

export default BouncingBall
