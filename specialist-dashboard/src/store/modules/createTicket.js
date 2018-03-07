import { CREATE_TICKET, UPDATE_TICKET } from '@/graphql/queries/ticket';
import { apolloClient } from '@/graphql/apolloClient';
import { TicketStatus } from '@/constants/enums/index';
import _ from 'lodash';
const state = {
    ticket: {
        status: TicketStatus.draft,
        details: {}
    },
    ticketSource: undefined,
    currentStep: 1,
};
  
  // getters
const getters = {
    ticketServerModel(state) {
        const mapFullModelToId = {
            elder: 'elderId',
            startAddress: 'startAddressId',
            destinationAddress: 'destinationAddressId',
            endAddress: 'endAddressId',
            issuingPerson: 'issuingPerson',
        };
        return Object.keys(state.ticket).reduce((serverModel, currentField) => {
            const mappedName = mapFullModelToId[currentField];
            if (mappedName) {
                const currentValue = state.ticket[currentField];
                serverModel[mappedName] = currentValue ? currentValue.id : undefined;
            } else {
                serverModel[currentField] = state.ticket[currentField];
            }
            return serverModel;
        }, {});
    },
};
  
  // actions
const actions = {
    async saveAndAdvanceStep({ commit, state, getters }, ) {
        const { ticket } = state;
        // we don't have all the required fields, so we must continue
        if (ticket.elder && ticket.startAddress) {
            const updatedTicket = await createOrUpdateTicket(getters.ticketServerModel);
            commit('updateTicket', updatedTicket);
        }
        commit('moveStep');
    },
};
  
  // mutations
  const mutations = {
    updateTicket (state, ticketUpdate) {
        state.ticket = _.merge({}, state.ticket, ticketUpdate);
    },
      updateTicketSource(state, source) {
          state.ticketSource = source;
    },
    moveStep(state) {
          state.currentStep++;
      },
    goBackStep(state) {
          state.currentStep = Math.max(1, state.currentStep - 1);
    }
  }
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
  

async function createOrUpdateTicket(ticketServerModel) {
    if (ticketServerModel.id) {
        return updateTicket(ticketServerModel);
    }
    return createTicket(ticketServerModel);
}


async function createTicket(ticket) {
    const response = await  apolloClient.mutate({
        mutation: CREATE_TICKET,
        variables: { ticket: ticket},
    });
    ticket = response.data.createTicket.ticket;
    return { id: ticket.id };

}

async function updateTicket(ticket) {
    const response =  await apolloClient.mutate({
        mutation: UPDATE_TICKET,
        variables: { ticket: ticket, id: ticket.id},
    });

    return {};
}