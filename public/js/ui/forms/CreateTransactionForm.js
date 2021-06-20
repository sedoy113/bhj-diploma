'use strict';

/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
	/**
	 * Вызывает родительский конструктор и
	 * метод renderAccountsList
	 * */
	constructor(element) {
		if (!element) {
			throw new Error(`Error empty ${element} in class CreateTransactionForm`)
		}
		super(element);
		this.renderAccountsList();
	}

	/**
	 * Получает список счетов с помощью Account.list
	 * Обновляет в форме всплывающего окна выпадающий список
	 * */
	renderAccountsList() {
		Account.list({}, (err, response) => {
			if (err === null && response.success) {
				let items = '';
				Array.from(response.data).forEach(item => { items += `<option value="${item.id}">${item.name}</option>` });
				this.element.querySelector('.accounts-select').innerHTML = items;
			}
		})
	}

	/**
	 * Создаёт новую транзакцию (доход или расход)
	 * с помощью Transaction.create. По успешному результату
	 * вызывает App.update(), сбрасывает форму и закрывает окно,
	 * в котором находится форма
	 * */
	onSubmit(data) {
		Transaction.create(data, (err, response) => {
			if (err === null && response.success) {
				this.element.reset();
				App.getModal('newIncome').close();
				App.update();
			}
		})
	}
}