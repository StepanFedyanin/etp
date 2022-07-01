import { tender as settings } from '@/settings';
import { REST, RESTError } from './rest';

export default class extends REST {
    static get settings() {
        return settings;
    }

    static getTenderList() {
        return this._get('list', {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении минималистичного список тендеров');
        });
    }

    static searchTenderList(params) {
        return this._post('list', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при поиске минималистичного списка тендеров');
        });
    }

    static getTenders(params) {
        return this._get('tenders', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении список тендеров');
        });
    }

    static searchTenders(params) {
        return this._post('tenders', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при поиске списка тендеров');
        });
    }

    static getTender(id) {
        return this._get(`${id}`, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении тендера');
        });
    }

    static createTender(params) {
        return this._post('create_tender', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось создать тендер');
        });
    }

    static updateTender(id, params) {
        return this._post(`${id}/update_tender`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось обновить тендер');
        });
    }

    static deleteTender(id) {
        return this._delete(`${id}`, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при удалении тендера');
        });
    }

    static getTenderDocuments(id) {
        return this._get(`${id}/documents`, {}).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении документов тендера');
        })
    }

    static addTenderDocument(id, params) {
        return this._post(`${id}/add_document`, {}, params).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при добавлении документа тендера');
        })
    }

    static deleteTenderDocument(tenderId, documentId) {
        return this._delete(`${tenderId}/documents/${documentId}`, {}).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при удалении документа тендера');
        })
    }

    static getTenderLots(id) {
        return this._get(`${id}/lots`, {}).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении лотов тендера');
        })
    }

    static addTenderLot(id, params) {
        return this._post(`${id}/add_lot`, {}, params).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при добавлении лота тендера');
        })
    }

    static updateTenderLot(tenderId, lotId, params) {
        return this._post(`${tenderId}/lots/${lotId}/update_lot`, {}, params).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при добавлении лота тендера');
        })
    }

    static deleteTenderLot(tenderId, documentId) {
        return this._delete(`${tenderId}/lots/${documentId}`, {}).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при удалении лота тендера');
        })
    }

    static addTenderLotBet(tenderId, lotId, params) {
        return this._post(`${tenderId}/lots/${lotId}/bets/create_bet`, {}, params).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при добавлении ставки лота');
        })
    }

    static addTenderParticipant(tenderId, params) {
        return this._post(`${tenderId}/participants/apply`, {}, params).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при добавлении заявки на участие в тендере');
        })
    }

    static getTenderParticipant(tenderId, participantId) {
        return this._get(`${tenderId}/participants/${participantId}`, {}, {}).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении заявки на участие в тендере');
        })
    }

    static confirmTenderParticipant(tenderId, participantId, params) {
        return this._post(`${tenderId}/participants/${participantId}/confirm`, {}, params).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при подтверждении заявки на участие в тендере');
        })
    }

    static denyTenderParticipant(tenderId, participantId, params) {
        return this._post(`${tenderId}/participants/${participantId}/deny`, {}, params).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при отказе заявки на участие в тендере');
        })
    }

    static getTenderParticipants(tenderId) {
        return this._get(`${tenderId}/participants`, {}, {}).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении заявок на участие в тендере');
        })
    }

    static cancelTenderParticipant(tenderId) {
        return this._delete(`${tenderId}/participants/cancel`, {}, {}).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при отмене заявки на участие в тендере');
        })
    }

    static addTenderParticipantDocument(id, params) {
        return this._post(`${id}/participants/upload_document`, {}, params).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при добавлении документа заявки');
        })
    }

    static deleteTenderParticipantDocument(tenderId, params) {
        return this._delete(`${tenderId}/participants/remove_document/`, {}, params).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при удалении документа тендера');
        })
    }
}
