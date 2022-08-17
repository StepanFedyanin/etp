import { tender as settings } from '@/settings';
import { REST, RESTError } from './rest';

export default class extends REST {
    static get settings() {
        return settings;
    }

    static getDraftList() {
        return this._get('drafts', {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении минималистичного списка черновиков');
        });
    }

    static getTenderList() {
        return this._get('list', {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении минималистичного списка тендеров');
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

    static getMyCurrentsTenders(params) {
        return this._post('my_currents', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении список тендеров');
        });
    }

    static getMyClosedTenders(params) {
        return this._post('my_closed', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении список тендеров');
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

    static switchFavoriteTender(id) {
        return this._get(`${id}/pin_unpin`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при изменении статуса избранного тендера');
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

    static updateTenderDocument(tenderId, documentId, params) {
        return this._post(`${tenderId}/documents/${documentId}/update_doc`, {}, params).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при обновлении документа тендера');
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

    static cancelTenderLotBet(tenderId, lotId, params) {
        return this._delete(`${tenderId}/lots/${lotId}/bets/delete_last_bet`, {}, params).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при удалении ставки лота');
        })
    }

    static getTenderLotUsers(tenderId, lotId) {
        return this._get(`${tenderId}/lots/${lotId}/played_users`, {}, {}).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении участников лота');
        })
    }

    static changeTenderLotWinner(tenderId, lotId, params) {
        return this._post(`${tenderId}/lots/${lotId}/change_winner`, {}, params).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при изменении ставки победителя');
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
    static sendInvitationInTender(tenderId, params){
        return this._post(`${tenderId}/invites/invite`, {}, params).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при отправке приглашения в тендер');
        })
    }
    static getInvitationInTender(tenderId, params){
        return this._get(`${tenderId}/invites`, {}, params).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении списка приглашений в тендер');
        })
    }
    static cancelInvitation(tenderId, inviteId){
        return this._post(`${tenderId}/invites/${inviteId}/cancel`, {}, {}).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при отмене приглашения в тендер');
        })
    }
    static getListInvitation(){
        return this._get(`invites`, {}).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении приглашений в тендер');
        })
    }
    static rejectInvitation(tenderId){
        return this._post(`${tenderId}/invites/reject`, {}).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при отклонении приглашения в тендер');
        })
    }
    static acceptInvitation(tenderId){
        return this._post(`${tenderId}/invites/accept`, {}).then((data) => {
            return data
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при отклонении приглашения в тендер');
        })
    }
    static favoritesTenders(params){
        return this._get('tender/favorites', {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Ошибка при получении списка избранных тендеров');
        });
    }
}
