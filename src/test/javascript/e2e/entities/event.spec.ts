import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Event e2e test', () => {

    let navBarPage: NavBarPage;
    let eventDialogPage: EventDialogPage;
    let eventComponentsPage: EventComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Events', () => {
        navBarPage.goToEntity('event');
        eventComponentsPage = new EventComponentsPage();
        expect(eventComponentsPage.getTitle())
            .toMatch(/Events/);

    });

    it('should load create Event dialog', () => {
        eventComponentsPage.clickOnCreateButton();
        eventDialogPage = new EventDialogPage();
        expect(eventDialogPage.getModalTitle())
            .toMatch(/Create or edit a Event/);
        eventDialogPage.close();
    });

    it('should create and save Events', () => {
        eventComponentsPage.clickOnCreateButton();
        eventDialogPage.setTitleInput('title');
        expect(eventDialogPage.getTitleInput()).toMatch('title');
        eventDialogPage.setStartDateInput('2000-12-31');
        expect(eventDialogPage.getStartDateInput()).toMatch('2000-12-31');
        eventDialogPage.setEndDateInput('2000-12-31');
        expect(eventDialogPage.getEndDateInput()).toMatch('2000-12-31');
        eventDialogPage.setLocationInput('location');
        expect(eventDialogPage.getLocationInput()).toMatch('location');
        eventDialogPage.setMaxParticipantsInput('5');
        expect(eventDialogPage.getMaxParticipantsInput()).toMatch('5');
        eventDialogPage.save();
        expect(eventDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EventComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-event div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class EventDialogPage {
    modalTitle = element(by.css('h4#myEventLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    startDateInput = element(by.css('input#field_startDate'));
    endDateInput = element(by.css('input#field_endDate'));
    locationInput = element(by.css('input#field_location'));
    maxParticipantsInput = element(by.css('input#field_maxParticipants'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    };

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
    };

    setStartDateInput = function(startDate) {
        this.startDateInput.sendKeys(startDate);
    };

    getStartDateInput = function() {
        return this.startDateInput.getAttribute('value');
    };

    setEndDateInput = function(endDate) {
        this.endDateInput.sendKeys(endDate);
    };

    getEndDateInput = function() {
        return this.endDateInput.getAttribute('value');
    };

    setLocationInput = function(location) {
        this.locationInput.sendKeys(location);
    };

    getLocationInput = function() {
        return this.locationInput.getAttribute('value');
    };

    setMaxParticipantsInput = function(maxParticipants) {
        this.maxParticipantsInput.sendKeys(maxParticipants);
    };

    getMaxParticipantsInput = function() {
        return this.maxParticipantsInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
