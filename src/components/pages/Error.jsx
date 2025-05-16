import error404 from '../../assets/error404.png'
import '../../App.css'
const Error = () => {
    return (
        <section className="container errorSection">
            <div className="text-center">
                <img src={error404} alt="error 404" className='w-100'/>
            </div>
        </section>
    );
};

export default Error;