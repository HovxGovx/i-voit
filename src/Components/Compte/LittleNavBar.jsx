import special from '../Assets/Icons/covoiturage(3).png'
import special2 from '../Assets/Icons/voiture(1).png'
import special3 from '../Assets/Icons/voiture(2).png'
const Choix = () => {
    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-center items-center ">
                    <p>Demande</p>
                        <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                        -1-
                    </button>
                </div>
                <div className="p-4 pb-2 flex justify-between items-center">
                    <p>Trajet</p>
                    <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                        -1-
                    </button>
                </div>
                <div className="p-4 pb-2 flex justify-between items-center">
                    <p>Prise</p>
                    <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                        -1-
                    </button>
                </div>
                <div className="p-4 pb-2 flex justify-between items-center">
                    <p>Reservation</p>
                    <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                        -1-
                    </button>
                </div>

            </nav>


        </aside>
    );
}

export default Choix;