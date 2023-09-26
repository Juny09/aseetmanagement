import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";

const ContractStatus = () => {
    return (
        <div className="u-flex u-main-center">
            <div className="u-margin-32">
                <div className="status is-complete">
                    <span className="status-icon"></span>
                    <span className="text">Accepted</span>
                </div>
                <h4 className="heading-level-4 u-text-center">2,340</h4>
            </div>
            <div className="u-margin-32">
                <div className="status is-pending">
                    <span className="status-icon"></span>
                    <span className="text">In Contract</span>
                </div>
                <h4 className="heading-level-4 u-text-center">1,782</h4>
            </div>
            <div className="u-margin-32">
                <div className="status is-processing">
                    <span className="status-icon"></span>
                    <span className="text">In Approval</span>
                </div>
                <h4 className="heading-level-4 u-text-center">1,596</h4>
            </div>
        </div>
    );
};

export default ContractStatus;
