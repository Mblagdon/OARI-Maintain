/**
 * EquipmentDetail.js
 *
 * This React component is responsible for displaying the details of a single piece of equipment.
 * It fetches and presents detailed information from the equipment record selected by the user.
 * It is typically rendered when a user navigates to the details page of an individual equipment item,
 * showing all relevant data such as name, description, and other attributes.
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EquipmentDetail() {
    const [equipmentDetails, setEquipmentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { equipmentId } = useParams();

    useEffect(() => {
        fetch(`/api/equipment/${equipmentId}`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setEquipmentDetails(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [equipmentId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!equipmentDetails) return <div>Equipment not found</div>;

    // Determine if the equipment is of type 'software' or 'drone' to conditionally render the new fields
    const isSoftware = equipmentDetails.type === 'software';
    const isDrone = equipmentDetails.type === 'drone';

    return (
        <div className="equipment-detail-container">
            <div className="equipment-header">{equipmentDetails.equipment_name}</div>

            <div className="equipment-section">
                <div className="equipment-section-title">Equipment ID:</div>
                <div className="equipment-section-content">{equipmentDetails.id}</div>
            </div>

            <div className="equipment-section">
                <div className="equipment-section-title">Description:</div>
                <div className="equipment-section-content">{equipmentDetails.description}</div>
            </div>

            <div className="equipment-section">
                <div className="equipment-section-title">Use Case Examples:</div>
                <div className="equipment-section-content">{equipmentDetails.use_case_examples}</div>
            </div>

            {/* Render these fields only for non-software types */}
            {!isSoftware && (
                <>
                <div className="equipment-section">
                    <div className="equipment-section-title">Asset Number:</div>
                    <div className="equipment-section-content">{equipmentDetails.asset_number}</div>
                </div>

                <div className="equipment-section">
                    <div className="equipment-section-title">Location:</div>
                    <div className="equipment-section-content">{equipmentDetails.location}</div>
                </div>

                <div className="equipment-section">
                    <div className="equipment-section-title">Basic Specifications:</div>
                    <div className="equipment-section-content">{equipmentDetails.basic_specifications}</div>
                </div>
                <div className="equipment-section">
                    <div className="equipment-section-title">Storage Dimensions:</div>
                    <div className="equipment-section-content">{equipmentDetails.storage_dimensions}</div>
                </div>

                <div className="equipment-section">
                    <div className="equipment-section-title">Minimum Temperature:</div>
                    <div className="equipment-section-content">{equipmentDetails.min_temp}°C</div>
                </div>

                <div className="equipment-section">
                    <div className="equipment-section-title">Maximum Temperature:</div>
                    <div className="equipment-section-content">{equipmentDetails.max_temp}°C</div>
                </div>

                <div className="equipment-section">
                    <div className="equipment-section-title">Max Wind Resistance:</div>
                    <div className="equipment-section-content">{equipmentDetails.max_wind_resistance} km/h</div>
                </div>

                <div className="equipment-section">
                    <div className="equipment-section-title">Minimum Lighting:</div>
                    <div className="equipment-section-content">{equipmentDetails.min_lighting}</div>
                </div>
                </>
            )}

            {/* Conditional rendering for drone-specific fields */}
            {isDrone && (
                <>
                    <div className="equipment-section">
                        <div className="equipment-section-title">Weight (with batteries):</div>
                        <div className="equipment-section-content">{equipmentDetails.weight_with_batteries} kg</div>
                    </div>

                    <div className="equipment-section">
                        <div className="equipment-section-title">Frame Weight (no batteries):</div>
                        <div className="equipment-section-content">{equipmentDetails.frame_weight} kg</div>
                    </div>

                    <div className="equipment-section">
                        <div className="equipment-section-title">Max Take-Off Weight:</div>
                        <div className="equipment-section-content">{equipmentDetails.max_take_off_weight} kg</div>
                    </div>

                    <div className="equipment-section">
                        <div className="equipment-section-title">Max Payload Weight:</div>
                        <div className="equipment-section-content">{equipmentDetails.max_payload_weight} kg</div>
                    </div>

                    <div className="equipment-section">
                        <div className="equipment-section-title">IP Rating:</div>
                        <div className="equipment-section-content">{equipmentDetails.ip_rating}</div>
                    </div>
                </>
            )}

            {/* Conditional rendering for software-specific fields */}
            {isSoftware && (
                <>

                    <div className="equipment-section">
                        <div className="equipment-section-title">Date Bought:</div>
                        <div className="equipment-section-content">{equipmentDetails.date_bought}</div>
                    </div>

                    <div className="equipment-section">
                        <div className="equipment-section-title">Renewal Date:</div>
                        <div className="equipment-section-content">{equipmentDetails.renewal_date}</div>
                    </div>

                    <div className="equipment-section">
                        <div className="equipment-section-title">Price:</div>
                        <div className="equipment-section-content">{equipmentDetails.price}</div>
                    </div>
                </>
            )}

        </div>
    );
}

export default EquipmentDetail;
