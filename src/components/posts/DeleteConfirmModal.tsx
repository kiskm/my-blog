type DeleteConfirmModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
}

const DeleteConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
}: DeleteConfirmModalProps) => {
    return !isOpen ? null
    : (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50
        transition-all duration-500 animate-in fade-in">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                <h3 className="text-lg mb-4 flex">
                    本当に
                    <div className="font-bold">{title}</div>
                    を削除しますか？</h3>
                <p className="text-gray-600 mb-6">
                    この操作は取り消せません。
                </p>
                <div className="flex gap-3 justify-end">
                    <button
                    onClick={onClose}
                    className="px-4 py-2 border rounded hover:bg-gray-100">
                        キャンセル
                    </button>
                    <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        削除
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmModal