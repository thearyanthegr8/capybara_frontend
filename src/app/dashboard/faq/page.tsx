import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Separator } from "@/components/ui/separator";

function page() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">FAQ</h1>
        <h2 className="text-xl font-semibold tracking-tight mb-2">Doctors</h2>
      </div>
      <Separator />
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Is MediChain secure for storing patient information?
          </AccordionTrigger>
          <AccordionContent>
            Yes, MediChain places a high priority on the security and privacy of
            patient data. Utilising blockchain technology, we implement a
            decentralised approach to storing and managing medical records. This
            ensures that patient information is tamper-proof, transparent, and
            resistant to unauthorised access or modification.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            How can I track my patients&apos; prescription history?
          </AccordionTrigger>
          <AccordionContent>
            Your personalised profile on the platform includes a comprehensive
            dashboard where you can track and manage your patients&apos; prescription
            history. You can view past prescriptions
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Can I edit or update a prescription after it&apos;s been created?
          </AccordionTrigger>
          <AccordionContent>
            Once a prescription has been generated, it cannot be edited or
            updated to maintain data integrity and regulatory compliance.
            However, you can create a new prescription with revised information
            if needed, and the previous prescription will remain accessible for
            reference.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            What information is required to create a prescription?
          </AccordionTrigger>
          <AccordionContent>
            When creating a prescription, you&apos;ll need to provide basic patient
            information such as name, age, and contact details, along with
            details of the prescribed medications, dosage instructions, and any
            additional notes or precautions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            How do I purchase additional tokens or upgrade my subscription plan?
          </AccordionTrigger>
          <AccordionContent>
            To purchase additional tokens or upgrade your subscription plan,
            navigate to the &quot;Subscription&quot; or &quot;Token Packs&quot; section in your
            account settings. Follow the prompts to select your desired plan or
            token pack and complete the payment process securely.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <h2 className="text-xl font-semibold tracking-tight mt-4 mb-2">Pharmacists</h2>
      <Separator className="mb-2"/>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How do I verify the authenticity of a prescription using the
            platform?
          </AccordionTrigger>
          <AccordionContent>
            To verify a prescription, log in to your account and simply scan the
            QR code on the prescription using the platform&apos;s QR code scanner,
            and the system will retrieve the prescription details from the
            blockchain for validation.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            What should I do if I encounter an invalid or suspicious
            prescription?
          </AccordionTrigger>
          <AccordionContent>
            If you encounter an invalid or suspicious prescription during
            verification, follow your organization&apos;s protocol for handling such
            cases. You may contact the prescribing doctor or healthcare facility
            for clarification, or report the issue to the appropriate regulatory
            authorities if necessary.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            How can I report technical issues or request support?
          </AccordionTrigger>
          <AccordionContent>
            If you encounter technical issues or require assistance, please
            contact our customer support team for prompt assistance. You can
            reach us via email, phone, or through the support portal on the
            platform. Our dedicated support team is available to address any
            concerns or queries you may have.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            Can I access the platform on multiple devices or locations?
          </AccordionTrigger>
          <AccordionContent>
            Yes, you can access the platform from any internet and
            camera-enabled device with your login credentials. Whether you&apos;re
            using a tablet, or smartphone, you can securely log in to your
            account and verify prescriptions from anywhere with an internet
            connection.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default page;
