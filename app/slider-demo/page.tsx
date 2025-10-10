"use client";

import { useCallback, useMemo, useState } from "react";
import ModusSlider from "../components/ModusSlider";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

interface RangeConfig {
  min: number;
  max: number;
  step: number;
}

const volumeConfig: RangeConfig = { min: 0, max: 100, step: 1 };
const lightingConfig: RangeConfig = { min: 2000, max: 6500, step: 100 };
const pressureConfig: RangeConfig = { min: 0, max: 400, step: 10 };

export default function SliderDemoPage() {
  const [volume, setVolume] = useState(42);
  const [lighting, setLighting] = useState(3200);
  const [pressure, setPressure] = useState(180);
  const [disabled, setDisabled] = useState(false);
  const [eventLog, setEventLog] = useState<string[]>([]);

  const resetValues = () => {
    setVolume(42);
    setLighting(3200);
    setPressure(180);
    setDisabled(false);
    logEvent("Reset all slider values to defaults");
  };

  const logEvent = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog((prev) => {
      const nextEntries = [`${timestamp} — ${message}`, ...prev];
      return nextEntries.slice(0, 18);
    });
  }, []);

  const handleSliderChange =
    (setter: (value: number) => void, label: string) =>
    (event: CustomEvent<InputEvent>) => {
      const target = event.target as HTMLModusWcSliderElement | null;
      if (!target) {
        return;
      }

      const newValue = Number(target.value);
      setter(newValue);
      logEvent(`${label} set to ${newValue}`);
    };

  const lightingLabel = useMemo(() => {
    if (lighting < 3000) return "Warm ambience";
    if (lighting < 4500) return "Neutral task lighting";
    return "Cool daylight";
  }, [lighting]);

  const pressureLabel = useMemo(() => {
    if (pressure < 150) return "Low circuit pressure";
    if (pressure < 250) return "Nominal circuit pressure";
    return "High circuit pressure";
  }, [pressure]);

  return (
    <>
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <div className="text-4xl font-semibold text-foreground mb-4">
            Modus Slider Component Demo
          </div>
          <div className="text-lg text-foreground opacity-80 leading-relaxed max-w-3xl mx-auto">
            Continuous and stepped sliders provide intuitive numeric input with
            theme-aware styling. Use them for settings, instrumentation, and
            tuning controls across Trimble projects.
          </div>
        </div>

        {/* Smart Building Controls */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-6">
            <div>
              <div className="text-2xl font-semibold text-foreground mb-2">
                Building Environment Controls
              </div>
              <div className="text-sm text-foreground opacity-80">
                Each slider is fully controlled in React. Values update in
                real-time as users interact, keeping instrumentation displays in
                sync.
              </div>
            </div>
            <div className="flex gap-3">
              <ModusWcButton
                color="primary"
                variant="outlined"
                size="sm"
                onButtonClick={resetValues}
              >
                Reset controls
              </ModusWcButton>
              <ModusWcButton
                color={disabled ? "warning" : "secondary"}
                variant="outlined"
                size="sm"
                onButtonClick={() => {
                  setDisabled((prev) => !prev);
                  logEvent(`${disabled ? "Enabled" : "Disabled"} sliders`);
                }}
              >
                {disabled ? "Enable sliders" : "Disable sliders"}
              </ModusWcButton>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-background border border-border rounded-lg p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between text-sm text-foreground opacity-80">
                <span>Audio volume</span>
                <div className="font-semibold text-foreground">{volume}%</div>
              </div>
              <ModusSlider
                label="Volume"
                min={volumeConfig.min}
                max={volumeConfig.max}
                step={volumeConfig.step}
                value={volume}
                size="md"
                onInputChange={handleSliderChange(setVolume, "Volume")}
                disabled={disabled}
                aria-label="Master audio volume"
              />
              <div className="text-xs text-foreground opacity-70">
                Fine-grained adjustments in one percent increments control
                auditorium sound levels.
              </div>
            </div>

            <div className="bg-background border border-border rounded-lg p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between text-sm text-foreground opacity-80">
                <span>Lighting temperature</span>
                <div className="font-semibold text-foreground">{lighting}K</div>
              </div>
              <ModusSlider
                label="Lighting"
                min={lightingConfig.min}
                max={lightingConfig.max}
                step={lightingConfig.step}
                value={lighting}
                size="lg"
                onInputChange={handleSliderChange(setLighting, "Lighting")}
                disabled={disabled}
                aria-label="Lighting temperature"
              />
              <div className="text-xs text-foreground opacity-70">
                {lightingLabel}. Adjust in 100 Kelvin increments for both warm
                and cool palettes.
              </div>
            </div>

            <div className="bg-background border border-border rounded-lg p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between text-sm text-foreground opacity-80">
                <span>Hydraulic pressure</span>
                <div className="font-semibold text-foreground">
                  {pressure} psi
                </div>
              </div>
              <ModusSlider
                label="Hydraulic circuit"
                min={pressureConfig.min}
                max={pressureConfig.max}
                step={pressureConfig.step}
                value={pressure}
                size="sm"
                onInputChange={handleSliderChange(setPressure, "Pressure")}
                disabled={disabled}
                aria-label="Hydraulic circuit pressure"
              />
              <div className="text-xs text-foreground opacity-70">
                {pressureLabel}. Step increments match the mechanical relief
                tolerances.
              </div>
            </div>
          </div>
        </div>

        {/* Application Scenarios */}
        <div
          className="mb-12 p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-6">
            Application Scenarios
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background border border-border rounded-lg p-6 flex flex-col gap-3">
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Equipment telemetry
              </div>
              <ModusSlider
                label="Engine RPM"
                min={800}
                max={3200}
                step={100}
                value={2200}
                size="lg"
                aria-label="Engine RPM slider"
                customClass="slider-telemetry"
              />
              <ModusSlider
                label="Coolant temperature"
                min={150}
                max={260}
                step={5}
                value={190}
                size="md"
                aria-label="Coolant temperature slider"
                customClass="slider-telemetry"
              />
              <ModusSlider
                label="Fuel level"
                min={0}
                max={100}
                step={1}
                value={64}
                size="sm"
                aria-label="Fuel level slider"
                customClass="slider-telemetry"
              />
            </div>
            <div className="bg-background border border-border rounded-lg p-6 flex flex-col gap-3">
              <div className="text-sm uppercase tracking-wide text-muted-foreground">
                Design workflows
              </div>
              <ModusSlider
                label="Elevation offset"
                min={-10}
                max={10}
                step={0.5}
                value={2.5}
                aria-label="Elevation offset slider"
              />
              <ModusSlider
                label="Cut/fill tolerance"
                min={0}
                max={25}
                step={0.5}
                value={6.5}
                aria-label="Cut fill tolerance slider"
              />
              <ModusSlider
                label="Visualization opacity"
                min={0}
                max={100}
                step={5}
                value={40}
                aria-label="Visualization opacity slider"
              />
            </div>
          </div>
        </div>

        {/* Event Log */}
        <div
          className="p-8 bg-card rounded-lg border border-border"
          style={{ borderWidth: "1px" }}
        >
          <div className="text-2xl font-semibold text-foreground mb-4">
            Interaction Log
          </div>
          <div className="text-sm text-foreground opacity-70 mb-4">
            Detailed events captured from `inputChange` to monitor how sliders
            are used.
          </div>
          <div className="bg-background border border-border rounded-lg p-4 min-h-40">
            {eventLog.length === 0 ? (
              <div className="text-sm text-foreground opacity-60">
                Adjust any slider above to populate the log.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {eventLog.map((entry, index) => (
                  <div
                    key={`${entry}-${index}`}
                    className="text-sm text-foreground leading-relaxed"
                  >
                    {entry}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .slider-telemetry .modus-wc-slider-label {
          color: var(--modus-wc-color-info);
        }
      `}</style>
    </>
  );
}
