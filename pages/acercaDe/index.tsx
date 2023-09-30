import React from "react";
import FeatureRow from "@/app/components/acercaDe/featureRow";
import AcercaaDe from "@/app/components/acercaDe/acercaDe";
const AcercaDe: React.FC = () => {
  return (
    <div>
      <FeatureRow
        imageSrc="/img/2.jpg"
        title="Título del Feature 1"
        description="Descripción del Feature 1"
        marginTop
      />
      <AcercaaDe />
      <FeatureRow
        imageSrc="/img/1.jpg"
        title="Título del Feature 2"
        description="Descripción del Feature 2"
        reverse
      />{" "}
    </div>
  );
};

export default AcercaDe;
