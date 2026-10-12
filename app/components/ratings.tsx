import {
    FaStar,
    FaStarHalf,
    FaRegStar,
} from 'react-icons/fa';
import { FaR } from 'react-icons/fa6';


type RatingProps = {
    rating: number;
    className?: string;
};

export default function Rating({ rating, className = "" }: RatingProps){
    return( 
        <div className={`flex text-[#0365f2] ${className}`} aria-label={`${rating} out of 5 stars`}>
            {[0,1,2,3,4].map((star)=>{
                if (rating >= star + 1) {
                    return <FaStar key={star} />;
                }

                if (rating >= star + 0.5) {
                    return <FaStarHalf key={star} />;
                }

                return <FaRegStar key={star} />;
            })}
        </div>
    );
}