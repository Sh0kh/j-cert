import NormalModal from "../UI/Modals/NormalModal";

export default function FileUploadInfoModal({ isOpen, onClose, data }) {
    return (
        <NormalModal isOpen={isOpen} onClose={onClose}>
            <div className="p-[20px] text-center">
                {/* Заголовок */}
                <h2 className="text-lg font-bold mb-4 text-black">Faylni qanday yuklash kerak?</h2>
                <p className="mb-3 text-gray-700">
                    Quyidagi bosqichlarni amalga oshiring:
                </p>
                {/* Нумерованный список */}
                <ol className="list-decimal pl-5 text-left space-y-2 text-gray-800">
                    <li>
                        1.Telefoningizdagi <strong className="text-blue-600">Payme</strong> ilovasini oching.
                    </li>
                    <li>
                        2. Ilovadagi qidiruv paneliga <strong className="text-blue-600">j-cert</strong> so‘zini kiriting va unga o‘ting.
                    </li>
                    <li>
                        3. Talab qilingan summani to‘lang va to‘lovni tasdiqlang.
                    </li>
                    <li>
                        4. To‘lov yakunlangandan so‘ng, to‘lov haqidagi <strong className="text-green-600">chekni saqlab oling</strong>.
                    </li>
                    <li>
                        5. Chekni ushbu saytga yuklash uchun quyidagi tugmani bosing va faylni tanlang.
                    </li>
                </ol>
                {/* Дополнительное сообщение */}
                <p className="mt-4 text-sm text-gray-600">
                    Agar biror muammo bo‘lsa, biz bilan bog‘laning!
                </p>
            </div>
        </NormalModal>
    );
}