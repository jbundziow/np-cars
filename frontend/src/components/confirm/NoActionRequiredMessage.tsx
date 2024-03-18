interface NoActionRequiredMessageProps {
    title: string;
    text1: string;
    text2: string;
    buttonText: string;
    buttonLink: string;
}

export const NoActionRequiredMessage = (props: NoActionRequiredMessageProps) => {
    const { title, text1, text2, buttonText, buttonLink } = props;

    return (
        <div className="bg-gray-100">
            <div className="p-6 md:mx-auto">
                <div className="animate-bounce-once">
                    <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6 animate-wiggle-once">
                        <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                </div>

                <div className="text-center text-black dark:text-white">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">{title}</h3>
                    <p className="text-gray-600 my-2">{text1}</p>
                    <p>{text2}</p>
                    <div className="py-10 text-center">
                        <a href={buttonLink} className="px-12 bg-primary hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg">
                            {buttonText}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
