

(function () {
    'use strict';
    if (!window.location.pathname.includes('tienda.html')) {
        return;
    }
    function injectMobileFilters() {
        const mobileFilterHTML = `
            <!-- Mobile Filter Button (Only visible on mobile) -->
            <button id="mobile-filter-btn" class="mobile-filter-btn">
                <i class="fas fa-filter"></i>
                <span>Filtros</span>
            </button>

            <!-- Mobile Filter Panel (Only visible on mobile) -->
            <div id="mobile-filter-panel" class="mobile-filter-panel">
                <!-- Overlay -->
                <div class="mobile-filter-overlay"></div>
                
                <!-- Panel Content -->
                <div class="mobile-filter-content">
                    <!-- Header -->
                    <div class="mobile-filter-header">
                        <h3>Filtros</h3>
                        <button class="mobile-filter-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <!-- Body -->
                    <div class="mobile-filter-body">
                        <!-- Liga Selector -->
                        <div class="mobile-filter-step">
                            <label>1. Selecciona Liga</label>
                            <select id="mobile-filter-league">
                                <option value="">Todas las Ligas</option>
                                <!-- Populated by JS -->
                            </select>
                        </div>
                        
                        <!-- Team Selector (hidden initially) -->
                        <div class="mobile-filter-step hidden" id="mobile-team-step">
                            <label>2. Selecciona Equipo</label>
                            <select id="mobile-filter-team">
                                <option value="">Todos los Equipos</option>
                                <!-- Populated by JS -->
                            </select>
                        </div>
                        
                        <!-- Checkbox Filters -->
                        <div class="mobile-filter-step mobile-filter-checkboxes">
                            <label class="mobile-filter-checkbox" for="mobile-filter-auto">
                                <input type="checkbox" id="mobile-filter-auto">
                                <span class="checkbox-custom"></span>
                                <span class="checkbox-label">Automático</span>
                            </label>
                            
                            <label class="mobile-filter-checkbox" for="mobile-filter-quartz">
                                <input type="checkbox" id="mobile-filter-quartz">
                                <span class="checkbox-custom"></span>
                                <span class="checkbox-label">Mecaquartz</span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="mobile-filter-footer">
                        <button id="mobile-clear-filters" class="btn-secondary">
                            Limpiar filtros
                        </button>
                        <button id="mobile-apply-filters" class="btn-primary">
                            Aplicar filtros
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', mobileFilterHTML);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        injectMobileFilters();
        setTimeout(setupMobileFilters, 100);
    }

    function setupMobileFilters() {
        const panel = document.getElementById('mobile-filter-panel');
        const btn = document.getElementById('mobile-filter-btn');
        const overlay = document.querySelector('.mobile-filter-overlay');
        const closeBtn = document.querySelector('.mobile-filter-close');
        const applyBtn = document.getElementById('mobile-apply-filters');
        const clearBtn = document.getElementById('mobile-clear-filters');

        const mobileLeagueSelect = document.getElementById('mobile-filter-league');
        const mobileTeamSelect = document.getElementById('mobile-filter-team');
        const mobileTeamStep = document.getElementById('mobile-team-step');
        const mobileAutoCheckbox = document.getElementById('mobile-filter-auto');
        const mobileQuartzCheckbox = document.getElementById('mobile-filter-quartz');

        const desktopLeagueSelect = document.getElementById('filter-league');
        const desktopTeamSelect = document.getElementById('filter-team');
        const desktopAutoCheckbox = document.getElementById('filter-auto');
        const desktopQuartzCheckbox = document.getElementById('filter-quartz');

        if (!panel || !btn) {
            console.warn('Mobile filter elements not found');
            return;
        }
        function openPanel() {
            panel.classList.add('active');
            document.body.style.overflow = 'hidden';
            syncToMobile();
        }
        function closePanel() {
            panel.classList.remove('active');
            document.body.style.overflow = '';
        }
        function syncToMobile() {
            if (desktopLeagueSelect && mobileLeagueSelect) {
                mobileLeagueSelect.innerHTML = desktopLeagueSelect.innerHTML;
                mobileLeagueSelect.value = desktopLeagueSelect.value || '';
            }
            const desktopTeamStep = document.getElementById('team-step');
            if (desktopTeamStep && !desktopTeamStep.classList.contains('hidden')) {
                mobileTeamStep.classList.remove('hidden');
                if (desktopTeamSelect && mobileTeamSelect) {
                    mobileTeamSelect.innerHTML = desktopTeamSelect.innerHTML;
                    mobileTeamSelect.value = desktopTeamSelect.value || '';
                }
            } else {
                mobileTeamStep.classList.add('hidden');
            }

            if (desktopAutoCheckbox && mobileAutoCheckbox) {
                mobileAutoCheckbox.checked = desktopAutoCheckbox.checked;
            }
            if (desktopQuartzCheckbox && mobileQuartzCheckbox) {
                mobileQuartzCheckbox.checked = desktopQuartzCheckbox.checked;
            }
        }
        function applyFilters() {
            const selectedLeague = mobileLeagueSelect.value;
            const selectedTeam = mobileTeamSelect.value;
            const autoChecked = mobileAutoCheckbox ? mobileAutoCheckbox.checked : false;
            const quartzChecked = mobileQuartzCheckbox ? mobileQuartzCheckbox.checked : false;

            // Update desktop values WITHOUT triggering change events
            if (desktopLeagueSelect) {
                desktopLeagueSelect.value = selectedLeague;
            }

            if (desktopAutoCheckbox) {
                desktopAutoCheckbox.checked = autoChecked;
            }
            if (desktopQuartzCheckbox) {
                desktopQuartzCheckbox.checked = quartzChecked;
            }

            if (selectedTeam && desktopTeamSelect) {
                desktopTeamSelect.value = selectedTeam;
            }

            // Update global variables in tienda.js
            if (typeof window.selectedAuto !== 'undefined') {
                window.selectedAuto = autoChecked;
            }
            if (typeof window.selectedQuartz !== 'undefined') {
                window.selectedQuartz = quartzChecked;
            }
            if (typeof window.selectedLeague !== 'undefined') {
                window.selectedLeague = selectedLeague;
            }
            if (typeof window.selectedTeam !== 'undefined') {
                window.selectedTeam = selectedTeam;
            }

            // Call applyFilters ONCE
            if (typeof window.applyFilters === 'function') {
                window.applyFilters();
            }

            closePanel();
        }
        function clearFilters() {
            // Clear mobile values
            mobileLeagueSelect.value = '';
            mobileTeamSelect.value = '';
            mobileTeamStep.classList.add('hidden');
            if (mobileAutoCheckbox) mobileAutoCheckbox.checked = false;
            if (mobileQuartzCheckbox) mobileQuartzCheckbox.checked = false;

            // Clear desktop values WITHOUT triggering change events
            if (desktopLeagueSelect) {
                desktopLeagueSelect.value = '';
            }
            if (desktopAutoCheckbox) {
                desktopAutoCheckbox.checked = false;
            }
            if (desktopQuartzCheckbox) {
                desktopQuartzCheckbox.checked = false;
            }

            // Clear global variables
            if (typeof window.selectedAuto !== 'undefined') {
                window.selectedAuto = false;
            }
            if (typeof window.selectedQuartz !== 'undefined') {
                window.selectedQuartz = false;
            }
            if (typeof window.selectedLeague !== 'undefined') {
                window.selectedLeague = '';
            }
            if (typeof window.selectedTeam !== 'undefined') {
                window.selectedTeam = '';
            }

            // Call applyFilters ONCE
            if (typeof window.applyFilters === 'function') {
                window.applyFilters();
            }

            closePanel();
        }
        function handleMobileLeagueChange() {
            const selectedLeague = mobileLeagueSelect.value;

            if (!selectedLeague) {
                mobileTeamStep.classList.add('hidden');
                mobileTeamSelect.value = '';
                return;
            }
            if (desktopLeagueSelect) {
                desktopLeagueSelect.value = selectedLeague;
                desktopLeagueSelect.dispatchEvent(new Event('change'));
                setTimeout(() => {
                    const desktopTeamStep = document.getElementById('team-step');
                    if (desktopTeamStep && !desktopTeamStep.classList.contains('hidden')) {
                        mobileTeamSelect.innerHTML = desktopTeamSelect.innerHTML;
                        mobileTeamStep.classList.remove('hidden');
                    }
                }, 50);
            }
        }
        btn.addEventListener('click', openPanel);
        overlay.addEventListener('click', closePanel);
        closeBtn.addEventListener('click', closePanel);
        applyBtn.addEventListener('click', applyFilters);
        clearBtn.addEventListener('click', clearFilters);
        mobileLeagueSelect.addEventListener('change', handleMobileLeagueChange);


    }
})();
