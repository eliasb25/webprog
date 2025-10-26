export function showCreateSection(folder){
    console.log(folder.name);
    let mainView = document.getElementById("mainView");
    mainView.innerHTML = getCreateSectionHTML(folder.name);
}

function getCreateSectionHTML(name){
    return `<div class="container my-5">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <h2 class="text-center mb-4">Neue Karteikarte für ${name} erstellen</h2>
                    <div class="card p-4 custom-card-shadow padding-top">

                        <form>
                            <div class="mb-4">
                                <label for="frontQuestion" class="form-label custom-label-style">Vorderseite
                                    (Frage)</label>
                                <textarea class="form-control custom-input" id="frontQuestion" rows="3"
                                    placeholder="Gib die Fragestellung ein..." required></textarea>
                            </div>
                    </div>
                    <div class="card p-4 custom-card-shadow">
                        <div class="mb-4">
                            <label for="backAnswer" class="form-label custom-label-style">Rückseite (Antwort)</label>
                            <textarea class="form-control custom-input" id="backAnswer" rows="5"
                                placeholder="Gib die Antwort/Lösung ein..." required></textarea>
                        </div>

                        <div class="mb-5">
                            <label for="imageUpload" class="form-label custom-label-style">Bild hinzufügen
                                (optional)</label>
                            <input class="form-control custom-input-file" type="file" id="imageUpload" accept="image/*">
                        </div>
                    </div>
                    </form>
                </div>
                <div class="row space-above">
                    <div class="wrapping">
                        <div class="col-4 col-md-3 order-2 order-md-1 button-size">
                            <div class="bg-dark text-white p-4 rounded-3 podium-card">
                                <span class="fs-5">Eingaben löschen</span>
                            </div>
                        </div>
                    </div>
                    <div class="wrapping">
                        <div class="col-4 col-md-3 order-2 order-md-1 button-size">
                            <div class="bg-yellow p-4 rounded-3 podium-card">
                                <span class="fs-5">Karteikarte anlegen</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="footer" class="mt-auto" style="margin-left: 20%;"></div>
        </div>`;
}